import supabase from '$lib/db';

export async function load({ url }) {
   const tag = url.searchParams.get('tag')
   let data
   if(tag != 'All'){
        data = await supabase.from('scripts').select('*').eq('type', tag)
        data = data.data
        data.sort((a, b)=>{
                return a.id - b.id
        })         
        data = data.reverse()
    }else{
        data = await supabase.from('scripts').select('*').not('type', 'eq', 'Script')
        data = data.data
        data.sort((a, b)=>{
                return a.id - b.id
        })         
        data = data.reverse()
    }
    
    let dbResponse = data
    return {
        tag: tag,
        dbResponse: dbResponse
    }
}