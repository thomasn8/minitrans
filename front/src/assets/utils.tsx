import axios from "axios";

export async function api_request(type: string, path: string, 
	token?: string | undefined, body?: any | undefined): Promise<any>
{	
	if (type === 'get') {
		axios.get(path, {
			headers: {
        Authorization: `Bearer ${token}`,
      },
		})
		.then((res) => {
			return res;
		})
		.catch((err) => {
			throw new Error(err);
		});

	}
	else if (type === 'post') {
		axios.post(path, body, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		.then((res) => {
			return res;
		})
		.catch((err) => {
			throw new Error(err);
		});

	}

	throw new Error('Bad type');
}