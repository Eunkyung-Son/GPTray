import SecretKeyInput from "@/components/SecretKeyInput/SecretKeyInput";
import Image from "next/image";

export default async function Home() {
  // const SECRET_KEY = "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";

  // const getList = await fetch("https://api.openai.com/v1/models", {
  //   headers: {
  //     Authorization: `Bearer ${SECRET_KEY}`,
  //   },
  // });

  // const modelList = await getList.json();

  // console.log(modelList.data.map((d) => d.id));

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SecretKeyInput />
      {/* <div>
        <select onChange={(e) => console.log(e)}>
          <option value="">--Please choose an option--</option>
          {modelList.data.map((v) => (
            <option label={v.id} value={v.id} key={v.id}>
              {v.id}
            </option>
          ))}
        </select>
      </div> */}
    </main>
  );
}
