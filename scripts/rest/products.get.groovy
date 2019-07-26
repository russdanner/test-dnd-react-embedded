import org.elasticsearch.action.search.SearchRequest
import org.elasticsearch.index.query.QueryBuilders
import org.elasticsearch.search.builder.SearchSourceBuilder
import org.elasticsearch.search.sort.FieldSortBuilder
import org.elasticsearch.search.sort.SortOrder

def result = [:]

def queryStatement = 'content-type:"/component/product"'

def builder = new SearchSourceBuilder().query(QueryBuilders.queryStringQuery(queryStatement))

// execute query
def executedQuery = elasticsearch.search(new SearchRequest().source(builder))

result.products = []

def elasticResults = executedQuery.hits.hits*.getSourceAsMap()
elasticResults.eachWithIndex { document, idx ->
	def product = [ id:             idx,
    				cmsId:          document.localId,
    				sku:            document.sku, 
                    title:          document.title, 
                    style:          document.style,
                    description:    document.description,
                    price:          getPrice(document),        // potentially get the price from external system
                    installments:   getInventory(document),    // potentially get inventory from external system
                    isFreeShipping: document.freeShipping,
                    availableSizes: document["sizes.item.key"],
                    currencyId:     "USD",  // hard code USD for now
                    currencyFormat: "\$",   // hard code currency format for now
                    largeImage:     document.largeImage,
                    smallImage:     document.smallImage
                  ]
    
	result.products.add(product)
}

return result



def getPrice(document) {
	// simple example of abstracting where price comes from
	return new Float(document.price)
}

def getInventory(document) {
	// simple example of abstracting where inventory comes from
	return new Integer(document.installments)
}
