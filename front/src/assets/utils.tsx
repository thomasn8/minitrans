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
		return res;
	}
	else if (type === 'post') {
		const res = await axios.post(path, body, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		return res;
	}

}