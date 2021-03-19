provider "aws" {
  region = "ap-southeast-2"
}

data "aws_caller_identity" "current" {}
data "aws_region" "current" {}

locals {
  account_id = data.aws_caller_identity.current.account_id
  region = data.aws_region.current.name
}

resource "aws_iam_policy" "amplify_developer" {
  description = "Allow a user to develop applications using AWS Amplify."
  name        = "AWSAmplifyDeveloper"
  policy      = data.aws_iam_policy_document.amplify_developer.json
}

data "aws_iam_policy_document" "amplify_developer" {
  statement {
    sid       = "AmplifyFullAccess"
    actions   = [
      "amplify:*",
      "apigateway:*",
      "appsync:*",
      "cloudformation:*",
      "cognito-identity:*",
      "cognito-idp:*",
      "dynamodb:*",
      "iam:*",
      "lambda:*",
      "route53:*",
      "s3:*"
    ]
    resources = [
      "*"
    ]
  }
}

resource "aws_iam_group" "library_app_developers" {
  name = "Library-app-developers"
}

resource "aws_iam_group_policy_attachment" "library_app_developers_policy_1" {
  group      = aws_iam_group.library_app_developers.name
  policy_arn = aws_iam_policy.amplify_developer.arn
}

resource "aws_iam_group_policy_attachment" "library_app_developers_policy_2" {
  group      = aws_iam_group.library_app_developers.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryPowerUser"
}

resource "aws_iam_group_policy_attachment" "library_app_developers_policy_3" {
  group      = aws_iam_group.library_app_developers.name
  policy_arn = "arn:aws:iam::aws:policy/AWSCodeCommitPowerUser"
}
 
resource "aws_iam_user" "library_app" {
  name = "library-app"
  path = "/library-app/"
}

resource "aws_iam_group_membership" "library_team" {
  name = "library-team-group-membership"

  users = [
    aws_iam_user.library_app.name,
  ]

  group = aws_iam_group.library_app_developers.name
}

resource "aws_s3_bucket" "christopherbare_library_bucket" {
  bucket = "christopherbare-library"
  acl    = "private"

  tags = {
    Name        = "christopherbare-library"
    Environment = "Dev"
  }
}

resource "aws_iam_role" "library_api_lambda_iam_role" {
  name = "library_api_lambda_iam_role"

  assume_role_policy = data.aws_iam_policy_document.library_api_lambda_iam_assume_role.json
}


data "aws_iam_policy_document" "library_api_lambda_iam_assume_role" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

data "aws_iam_policy_document" "library_api_lambda_policy" {

  statement {
    actions = [
      "s3:*",
    ]
    resources = [
      "arn:aws:s3:::christopherbare_library_bucket",
    ]
  }

  statement {
    actions   = [
      "apigateway:*",
      "lambda:*",
    ]
    resources = [
      "*",
    ]
  }
}

resource "aws_iam_policy" "library_api_lambda_iam_role_policy" {
  name        = "library_api_lambda_iam_role_policy"
  description = "Permissions for library_api_lambda_iam_role"

  policy = data.aws_iam_policy_document.library_api_lambda_policy.json
}

resource "aws_iam_role_policy_attachment" "library_api_lambda_iam_role_attach_policy" {
  role       = aws_iam_role.library_api_lambda_iam_role.name
  policy_arn = aws_iam_policy.library_api_lambda_iam_role_policy.arn
}

resource "aws_iam_role_policy_attachment" "library_api_lambda_iam_basic" {
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
  role       = aws_iam_role.library_api_lambda_iam_role.name
}

resource "aws_lambda_function" "library_api_lambda" {
  filename      = "../library-api-lambda.zip"
  function_name = "library-api-lambda"
  role          = aws_iam_role.library_api_lambda_iam_role.arn
  handler       = "lambda.handler"

  # The filebase64sha256() function is available in Terraform 0.11.12 and later
  # For Terraform 0.11.11 and earlier, use the base64sha256() function and the file() function:
  # source_code_hash = "${base64sha256(file("lambda_function_payload.zip"))}"
  source_code_hash = filebase64sha256("../library-api-lambda.zip")

  runtime = "python3.8"

  environment {
    variables = {
      foo = "bar"
    }
  }
}

# API Gateway
resource "aws_api_gateway_rest_api" "library_api" {
  name        = "library_api"
  description = "API Gateway for library app"

  endpoint_configuration {
    types = ["REGIONAL"]
  }
}

resource "aws_api_gateway_resource" "library_api" {
  rest_api_id = aws_api_gateway_rest_api.library_api.id
  parent_id   = aws_api_gateway_rest_api.library_api.root_resource_id
  path_part   = "{proxy+}"
}

resource "aws_api_gateway_method" "library_api" {
   rest_api_id   = aws_api_gateway_rest_api.library_api.id
   resource_id   = aws_api_gateway_resource.library_api.id
   http_method   = "ANY"
   authorization = "NONE"
}

resource "aws_api_gateway_integration" "library_api" {
  rest_api_id             = aws_api_gateway_rest_api.library_api.id
  resource_id             = aws_api_gateway_resource.library_api.id
  http_method             = aws_api_gateway_method.library_api.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.library_api_lambda.invoke_arn
}

resource "aws_api_gateway_method_response" "status_200" {
  rest_api_id             = aws_api_gateway_rest_api.library_api.id
  resource_id             = aws_api_gateway_resource.library_api.id
  http_method             = aws_api_gateway_method.library_api.http_method
  status_code = "200"
}

resource "aws_api_gateway_integration_response" "library_api" {
  rest_api_id             = aws_api_gateway_rest_api.library_api.id
  resource_id             = aws_api_gateway_method.library_api.resource_id
  http_method             = aws_api_gateway_method.library_api.http_method
  status_code             = aws_api_gateway_method_response.status_200.status_code
}

resource "aws_api_gateway_method" "library_api_root" {
   rest_api_id   = aws_api_gateway_rest_api.library_api.id
   resource_id   = aws_api_gateway_rest_api.library_api.root_resource_id
   http_method   = "ANY"
   authorization = "NONE"
}

resource "aws_api_gateway_integration" "library_api_root" {
  rest_api_id = aws_api_gateway_rest_api.library_api.id
  resource_id = aws_api_gateway_method.library_api_root.resource_id
  http_method = aws_api_gateway_method.library_api_root.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.library_api_lambda.invoke_arn
}

resource "aws_api_gateway_method_response" "root_status_200" {
  rest_api_id = aws_api_gateway_rest_api.library_api.id
  resource_id = aws_api_gateway_method.library_api_root.resource_id
  http_method = aws_api_gateway_method.library_api_root.http_method
  status_code = "200"
  response_models = {
        "application/json" = "Empty"
  }
}

resource "aws_api_gateway_integration_response" "library_api_root" {
  rest_api_id = aws_api_gateway_rest_api.library_api.id
  resource_id = aws_api_gateway_method.library_api_root.resource_id
  http_method = aws_api_gateway_method.library_api_root.http_method
  status_code = aws_api_gateway_method_response.root_status_200.status_code
}

resource "aws_lambda_permission" "library_api_root" {
  statement_id  = "allow_execution_library_api_root"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.library_api_lambda.function_name
  principal     = "apigateway.amazonaws.com"

  # More: http://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-control-access-using-iam-policies-to-invoke-api.html
  source_arn = "arn:aws:execute-api:${local.region}:${local.account_id}:${aws_api_gateway_rest_api.library_api.id}/*/*/"
}

resource "aws_lambda_permission" "library_api" {
  statement_id  = "allow_execution_library_api"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.library_api_lambda.function_name
  principal     = "apigateway.amazonaws.com"

  # More: http://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-control-access-using-iam-policies-to-invoke-api.html
  source_arn = "arn:aws:execute-api:${local.region}:${local.account_id}:${aws_api_gateway_rest_api.library_api.id}/*/*/*"
}

resource "aws_api_gateway_deployment" "library_api" {
  rest_api_id = aws_api_gateway_rest_api.library_api.id

  triggers = {
    redeployment = sha1(jsonencode(aws_api_gateway_rest_api.library_api.body))
  }

  lifecycle {
    create_before_destroy = true
  }

  depends_on = [
    aws_api_gateway_rest_api.library_api,
    aws_api_gateway_integration.library_api_root,
    aws_api_gateway_integration.library_api,
    aws_api_gateway_integration_response.library_api_root,
    aws_api_gateway_integration_response.library_api,
    aws_lambda_permission.library_api,
    aws_lambda_permission.library_api_root,
  ]
}

resource "aws_api_gateway_stage" "library_api_dev" {
  deployment_id = aws_api_gateway_deployment.library_api.id
  rest_api_id   = aws_api_gateway_rest_api.library_api.id
  stage_name    = "dev"
}

output "library_api_dev_url" {
  value = aws_api_gateway_stage.library_api_dev.invoke_url
}
