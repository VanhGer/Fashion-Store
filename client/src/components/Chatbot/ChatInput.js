import { Input, ConfigProvider } from "antd";
import { useEffect, useRef, useState } from "react";

export const ChatInput = ({ onSend, disabled }) => {
  const [content, setContent] = useState();

  const textareaRef = useRef(null);

  const handleChange = (e) => {
    const value = e.target.value;
    if (value.length > 4000) {
      alert("Message limit is 4000 characters");
      return;
    }

    setContent(value);
  };

  const handleSend = () => {
    if (!content) {
      alert("Vui lòng nhập nội dung tin nhắn");
      return;
    }
    onSend({ role: "user", content, time: new Date().toISOString() });
    setContent("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      // console.log(textareaRef.current.resizableTextArea.textArea.scrollHeight);
      textareaRef.current.resizableTextArea.textArea.style.height = "auto";
      textareaRef.current.resizableTextArea.textArea.style.height = `${textareaRef.current.resizableTextArea.textArea.scrollHeight}px`;
    }
  }, [content]);

  useEffect(() => {
    if (!disabled && textareaRef) {
      textareaRef.current.focus();
    }
  }, [disabled])

  return (
    <div className="flex flex-row gap-3 items-end">
      {/* <textarea
        ref={textareaRef}
        className="flex-1 min-h-[44px] pl-4 pr-12 py-2 w-full focus:outline-none focus:ring-1 focus:ring-neutral-300  border-t-neutral-200"
        style={{ resize: "none" }}
        placeholder="Nhập tin nhắn tại đây"
        value={content}
        rows={1}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      /> */}
      <ConfigProvider
        theme={{
          components: {
            Input: {
              /* here is your component tokens */
              // activeBorderColor: '#F7A3A0',
              // hoverBorderColor: '#F7A3A0'
            },
          },
        }}
      >
        <Input.TextArea
          placeholder="Nhập tin nhắn tại đây"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={content}
          className="flex-1 !min-h-10 border-2 border-neutral-200 overflow-hidden"
          style={{ resize: "none" }}
          ref={textareaRef}
          rows={1}
          maxLength={300}
          disabled={disabled}
        />
      </ConfigProvider>

      <button onClick={() => handleSend()} disabled={disabled}>
        {/* <IconArrowUp className="h-8 w-8 rounded-full p-1 bg-blue-500 text-white hover:opacity-80" /> */}
        {/* <svg x="0px"
          y="0px" viewBox="0 0 512.308 512.308" className="h-6 w-6 fill-[#1277FD] hover:opacity-70 mb-2">
          <g>
            <path
              d="M505.878,36.682L110.763,431.69c8.542,4.163,17.911,6.351,27.413,6.4h67.669c5.661-0.015,11.092,2.236,15.083,6.251   l36.672,36.651c19.887,20.024,46.936,31.295,75.157,31.317c11.652-0.011,23.224-1.921,34.261-5.653   c38.05-12.475,65.726-45.46,71.403-85.099l72.085-342.4C513.948,64.89,512.311,49.871,505.878,36.682z" />
            <path
              d="M433.771,1.652L92.203,73.61C33.841,81.628-6.971,135.44,1.047,193.802c3.167,23.048,13.782,44.43,30.228,60.885   l36.651,36.651c4.006,4.005,6.255,9.439,6.251,15.104v67.669c0.049,9.502,2.237,18.872,6.4,27.413L475.627,6.41   C462.645,0.03,447.853-1.651,433.771,1.652z" />
          </g>

        </svg> */}
        <div className={disabled ? "bg-gray-400 rounded-full mb-2" : "bg-[#D23F57] rounded-full mb-2"}><img src="https://cdn.express-chat.com/messenger/send2.svg" loading="lazy" alt="send" class="min-w-7 min-h-7 h-7 w-7" /></div>
      </button>
    </div>
  );
};
