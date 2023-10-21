"use client";

import { ChangeEvent, useState } from "react";
type Permission = {
  allow_create_engine: boolean;
  allow_fine_tuning: boolean;
  allow_logprobs: boolean;
  allow_sampling: boolean;
  allow_search_indices: boolean;
  allow_view: boolean;
  created: number;
  group: null;
  id: string;
  is_blocking: boolean;
  object: string;
  organization: string;
};

type DataObject = {
  id: string;
  created: number;
  object: "model";
  owned_by: string;
  parent: null;
  permission: Permission[];
  root: string;
};

type ErrorType = {
  message: string;
};

type ApiResponse =
  | { error: ErrorType; object: "list"; data?: never }
  | {
      error?: never;
      object: "list";
      data: {
        data: DataObject[];
      };
    };

const SecretKeyInput = () => {
  const [apiKey, setApiKey] = useState<string>();
  const [modelList, setModelList] = useState<DataObject[]>();
  const [question, setQuestion] = useState<string>();
  const [selectedModel, setSelectedModel] = useState("");

  const getList = async (): Promise<ApiResponse> => {
    try {
      const response = await fetch("https://api.openai.com/v1/models", {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });

      if (!response.ok) {
        const errorData: ErrorType = await response.json();
        return { error: errorData, object: "list" };
      }

      const data: { data: DataObject[] } = await response.json();
      return { object: "list", data };
    } catch (error) {
      console.error(error);
      return { error: { message: (error as Error).message }, object: "list" }; // 오류 반환 형태
    }
  };

  const getChatCompletion = async () => {
    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
          method: "GET",
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            // prompt: question,
            // max_tokens: 7,
            // temperature: 0,
            messages: [
              {
                role: "user",
                content: question,
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        const errorData: ErrorType = await response.json();
        return { error: errorData, object: "list" };
      }

      const data: { data: DataObject[] } = await response.json();
      return { object: "list", data };
    } catch (error) {
      console.error(error);
      return { error: { message: (error as Error).message }, object: "list" }; // 오류 반환 형태
    }
  };

  const handleClick = async () => {
    const response = await getList();
    if (response?.error) {
      alert(response.error.message);
      return;
    }
    setModelList(response?.data.data);
  };

  const handleQuestionClick = async () => {
    const data = await getChatCompletion();
  };

  const handleSelectModal = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedModel(e.currentTarget.value);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <input
          placeholder="API KEY를 입력해주세요"
          onChange={(e) => setApiKey(e.currentTarget.value)}
          value={apiKey}
        />
        <button onClick={handleClick}>확인!</button>
      </div>
      {modelList && (
        <div>
          <select onChange={handleSelectModal}>
            <option value="">--Please choose an option--</option>
            {modelList?.map((v) => (
              <option label={v.id} value={v.id} key={v.id}>
                {v.id}
              </option>
            ))}
          </select>
        </div>
      )}
      {selectedModel && (
        <div className="flex gap-4">
          <input
            placeholder="질문을 입력해 주세요"
            onChange={(e) => setQuestion(e.currentTarget.value)}
          />
          <button onClick={handleQuestionClick}>확인!</button>
        </div>
      )}
    </div>
  );
};

export default SecretKeyInput;
