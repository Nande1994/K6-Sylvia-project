import { check} from "k6";

export function validateLoginresponse(response)
{
return check(response,{
    'status is 200':(res)=> res.body.length>0});
}