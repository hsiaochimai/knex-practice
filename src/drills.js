require('dotenv').config()
const knex= require('knex')

const knexInstance =knex({
    client: 'pg',
    connection: process.env.DB_URL,
})
console.log('connection successful');

function searchByKeyWord(searchTerm){
    knexInstance
        .select('id', 'name','price', 'date_added', 'checked','category')
        .from('shopping_list')
        .where('name', 'ILIKE', `%${searchTerm}%`)
        .then(result=>{
            console.log(result)
        })
}


function paginateItems(pageNumber){
    const itemsPerPage= 6
    const offset= itemsPerPage *(pageNumber -1)
    knexInstance
        .select('id', 'name','price', 'date_added', 'checked','category')
        .from('shopping_list')
        .limit(itemsPerPage)
        .offset(offset)
        .then(result=>{
            console.log(result)
        })

}



function dateAfter(daysAgo){
    knexInstance    
    .select('id', 'name','price', 'date_added', 'checked','category')
    .from('shopping_list')
    .where('date_added','>', knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo))
    .orderBy([
        { column: 'date_added', order: 'DESC' }
    ])
    .then(result=>{
        console.log(result)
    })
}


function categoryTotal(){
    knexInstance
    .select('category',knex.raw('SUM(price)'))
    .from('shopping_list')
    .groupBy('category')
    .then(result=>{
        console.log(result)
    })

}
categoryTotal()