import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head';
import Date from "../../components/data"
import utilStyles from '../../styles/utils.module.css'

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />  {/* syntax replacing innerHTML =  */}
      </article>
    </Layout>
  )
}





export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}


export async function getStaticProps({ params }) {          //params means the parameter or dynamic route eg: localhost:3000/posts/2  params.id = 2
  // Add the "await" keyword like this: (to wait until remark renders the md data)                    
  const postData = await getPostData(params.id)          //gets the data of the post with the specified id
  return {
    props: {
      postData                          //to pass to the post function above
    }
  }
}

