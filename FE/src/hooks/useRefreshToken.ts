import { publicAxios } from "../api/axios";
import { useUserStore } from "../store/userStore";

const useRefreshToken = () => {
  const setToken = useUserStore((state) => state.setToken);

  const refresh = async () => {
    const response = await publicAxios.get("/refresh");
    setToken(response.data.accessToken);
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
