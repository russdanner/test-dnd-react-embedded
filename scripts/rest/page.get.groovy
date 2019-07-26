import org.apache.commons.lang3.StringUtils
import org.craftercms.engine.service.UrlTransformationService
import org.elasticsearch.action.search.SearchRequest
import org.elasticsearch.index.query.QueryBuilders
import org.elasticsearch.search.builder.SearchSourceBuilder
import org.elasticsearch.search.sort.FieldSortBuilder
import org.elasticsearch.search.sort.SortOrder


// ITERATION 0
/*
    return (
   <React.Fragment>
     <GithubCorner />
     <main>
       <Filter />
       <Shelf />

  	   </main>
     <FloatCart />
   </React.Fragment>
	);
*/
// ITERATION 1
// Creates the following output
// {"contentType":"/page/entry","col1":[{"contentType":"/component/githubcorner"},{"contentType":"/component/main","col1":[{"contentType":"/component/filter"},{"contentType":"/component/shelf"}]},{"contentType":"/component/floatcart"}]}
/*
def contentObject = [:]
contentObject.contentType = "/page/entry"
contentObject.col1 = []
// contentObject.col1[0] = [contentType: "/component/rich-text", copy: "CLASSROOM WORK WITH EBAY"]
// contentObject.col1[1] = [contentType: "/component/rich-text", copy: "<b>Richtext #2</b>"]
// contentObject.col1[2] = [contentType: "/component/2-col", col1: [ [contentType: "/component/rich-text", copy: "Nested widget1"] ],  col2: [ [contentType: "/component/rich-text", copy: "Nested Widget 2"]] ]
// contentObject.col1[3] = [contentType: "/component/rich-text", copy: "Rock and Roll!"]
contentObject.col1[0] = [contentType: "/component/githubcorner"]
contentObject.col1[1] = [contentType: "/component/main", col1: [ [contentType: "/component/filter"], [contentType: "/component/shelf"],  ] ]
contentObject.col1[2] = [contentType: "/component/floatcart"]
*/
def contentObject = [:]
def pageId = (params.id) ? params.id : "/site/website/index.xml"

def pageItem = siteItemService.getSiteItem(pageId)

contentObject.contentType = "/page/entry"
contentObject = getContentPage(pageItem.getDom(), pageId)


  /* turn a dom object in to a content map */
  def getContentPage(dom, path) {
      return getElementContent(dom.page, path)
  }
  
  /* turn a dom object in to a content map */
  def getContentComponent(dom, path) {
      return getElementContent(dom.component, path)
  }

  def getElementContent(element, path) {
  
      def content = [:]
      content.cmsId = path
      element.elements().each { property ->
      
          if(property.isTextOnly()) {
              // element is a property
              content[property.getName()] = property.getText()
          }
          else {
             
                  // item is a repeat group (recursive)
                  if("item".equals(property.getName())) {
                      if(!content[property.getName()]) {
                          // init the array
                          content[property.getName()] = []
                      }
                      
                      def include = property.selectNodes("./include");
                      if(include.size() == 0) {
                        // repeat group
                        content[property.getName()].add(getElementContent(property))
                      }
                      else {
                        // component
                        def componentPath = include[0].getText();
                        //content[property.getName()].add(componentPath)

                        // code that unfurls components
                        def compomentItem = siteItemService.getSiteItem(componentPath)
                        content[property.getName()].add(getElementContent(compomentItem.dom.component, componentPath))
                       

                        
                      }
                  }
                  else {
                      content[property.getName()] = getElementContent(property, "")
                  }

          }
      }
      
      return content
  }







return contentObject