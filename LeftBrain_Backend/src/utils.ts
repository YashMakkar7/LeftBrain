export const random = (len: number) :string => {
  let options = "qwertyuiopasdfghjklzxcvbnm1234567890";
  let length = options.length;

  let ans = "";
  for (let i = 0; i < length; i++) {
    ans += options[Math.floor(Math.random() * length)]
  }
  return ans;
};
 