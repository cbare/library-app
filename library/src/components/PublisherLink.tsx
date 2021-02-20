import {
  Link,
} from "react-router-dom";
import {slugify} from '../utils'


export interface PublisherParam {
  publisher: string
}

export function PublisherLink(props: PublisherParam) {
  const { publisher } = props
  return <Link to={"/publisher/" + slugify(publisher) }>{publisher}</Link>
}
