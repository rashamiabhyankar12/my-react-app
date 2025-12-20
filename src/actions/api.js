import axios from "axios";
import { dCandidate } from "../reducers/dCandidate";
import { fettchall } from "./dCandidate";

const baseurl = "http://localhost:5267/api/"


export default {
    dCandidate(url = baseurl + 'dCandidate/'){
        return {
            fetchAll : () => axios.get(url),
            fetchById : id => axios.get(url + id),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + id, updateRecord),
            delete : id => axios.delete(url + id)
        }
    }
}