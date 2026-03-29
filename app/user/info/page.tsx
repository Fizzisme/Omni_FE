import {getMe} from "@/components/Header/Header";
import UserInfoClient from "@/app/user/info/UserInfoClient/UserInfoClient";


export default async function Page() {
    const res = await getMe();
console.log(res)
    if (res.statusCode !== 200) {
        return <div>Unauthorized</div>;
    }


    return <UserInfoClient initialUser={res.data} />;
}