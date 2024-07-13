import axios from "axios";

const APIKEY = "59f4dd121a8a40bab669aecba3bcdce720240712165315971787";
const APPID = "IEX8Y13KJQG16RH";
const ORGID = "f3208911b7234bcc9dbc1e45d9c43575";

export const getProducts = async ({
  size = 10,
  page = 1,
}: {
  size?: number;
  page?: number;
}) => {
  try {
    const res = await axios({
      method: "GET",
      url: `https://timbu-get-all-products.reavdev.workers.dev`,
      withCredentials: false,
      params: {
        organization_id: ORGID,
        Appid: APPID,
        Apikey: APIKEY,
        page: page,
        size: size,
      },
    });
    return res.data;
  } catch (error: any) {
    return { ...error, error: true };
  }
};

export const getProduct = async (id: string) => {
  try {
    const res = await axios({
      method: "GET",
      url: `https://timbu-get-all-products.reavdev.workers.dev/${id}`,
      withCredentials: false,
      params: {
        organization_id: ORGID,
        Appid: APPID,
        Apikey: APIKEY,
      },
    });
    return res.data;
  } catch (error: any) {
    return { ...error, error: true };
  }
};
