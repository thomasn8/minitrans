import axios from "axios";

export async function api_request(type: string, path: string, 
	token?: string | undefined, body?: any | undefined): Promise<any>
{	
	if (type === 'get') {
		const res = await axios.get(path, {
			headers: {
        Authorization: `Bearer ${token}`,
      },
		})
		// .then((res) => {
		// 	return res;
		// })
		// .catch((err) => {
		// 	throw new Error(err);
		// });
		return res;
	}
	else if (type === 'post') {
		const res = await axios.post(path, body, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		// .then((res) => {
		// 	return res;
		// })
		// .catch((err) => {
		// 	console.log(err.response.data);
		// 	// throw new Error(err);
		// 	return err;
		// });
		return res;
	}

}