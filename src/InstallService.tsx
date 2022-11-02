import axios from './axiosConfig';

const SERVER: string = './vendor/abstracts/core/src/Helpers/install/api/?install=';

const InstallService = {
  config: async (values: any) => {
		return new Promise(async (resolve, reject) => {

			const payload: any = values;

      await axios.post(
        `${SERVER}config`,
        payload
      ).then(async (response: any) => {
        resolve(response);
      }).catch((error) => {
        reject(error.message);
      });

		});
  },
  database: async (values: any) => {
		return new Promise(async (resolve, reject) => {

			const payload: any = values;

      await axios.post(
        `${SERVER}database`,
        payload
      ).then(async (response: any) => {
        resolve(response);
      }).catch((error) => {
        reject(error.message);
      });

		});
  },
  directories: async (values: any) => {
		return new Promise(async (resolve, reject) => {

			const payload: any = values;

      await axios.post(
        `${SERVER}directories`,
        payload
      ).then(async (response: any) => {
        resolve(response);
      }).catch((error) => {
        reject(error.message);
      });

		});
  },
  server: async (values: any) => {
		return new Promise(async (resolve, reject) => {

			const payload: any = values;

      await axios.post(
        `${SERVER}server`,
        payload
      ).then(async (response: any) => {
        resolve(response);
      }).catch((error) => {
        reject(error.message);
      });

		});
  },
};

export default InstallService;