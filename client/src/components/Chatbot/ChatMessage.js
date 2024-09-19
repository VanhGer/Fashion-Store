
import { Avatar, Tooltip, Typography } from "antd";
import Markdown from 'markdown-to-jsx'

const { Text } = Typography;

export const ChatMessage = ({ message, hasSuggestions, onChoose }) => {
  return (
    <div className={`flex gap-3 items-end`}>
      {message.role === "assistant" && (
        <Avatar src="/chatbot.png" size={32} />
      )}
      <div className={`flex flex-col flex-1 ${message.role === "assistant" ? "items-start" : "items-end"}`}>
        {
          hasSuggestions ?
            <div className="bg-neutral-200 rounded-2xl px-[1px] pb-[1px] max-w-[80%]">
              <div
                className={`text-left rounded-t-2xl  ${message.role === "assistant" ? "bg-neutral-200 text-neutral-900" : "bg-[#D23F57] text-white"} px-3 py-2 w-fit whitespace-pre-wrap text-sm`}
                style={{ overflowWrap: "anywhere" }}
              >
                {message.content}
              </div>
              <div className="flex flex-col gap-[1px] rounded-b-2xl w-full">
                {
                  suggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      className={`${idx === suggestions.length - 1 ? "rounded-b-2xl" : ""} text-neutral-900 text-sm hover:bg-transparent flex flex-col gap-1 items-center justify-center bg-white`}
                      onClick={() => onChoose(suggestion.title)}
                    >
                      {/* <div className="h-[2px] bg-neutral-100 w-full"></div> */}
                      <div className="flex gap-1 p-2 items-center">
                        <img src={suggestion.icon_src} alt="" className="w-[1.25rem] h-[1.25rem]"></img>
                        <Text className="text-blue-400" strong>{suggestion.title}</Text>
                      </div>
                    </button>
                  ))
                }
              </div>
            </div>
            :
            <Tooltip title={formatDate(message.time)} zIndex={1000000000} placement={"left"}>
              <div
                className={`text-left ${message.role === "assistant" ? "bg-neutral-200 text-neutral-900 rounded-bl-none" : "bg-[#D23F57] text-white rounded-br-none"} rounded-2xl px-3 py-2 w-fit max-w-[80%] whitespace-pre-wrap text-sm`}
                style={{ overflowWrap: "anywhere" }}
              >
                <Markdown className="markdown">{message.content}</Markdown>
              </div>
            </Tooltip>
        }
        {
          "productInfo" in message &&
          <button className="max-w-[80%] h-[90px] rounded-2xl p-3 mt-3 shadow-md border flex gap-2" onClick={() => onChoose(`Tư vấn sản phẩm ${message.productInfo.name}`)}>
            <img src={message.productInfo.imageUrl} alt="" className="h-full rounded-lg"></img>
            <div className="flex flex-col items-start h-full">
              <Text strong className="text-blue-400 text-left break-words flex-1">{`Tư vấn sản phẩm ${message.productInfo.name}`}</Text>
              <Text strong className="text-[#D23F57]">{`₫${message.productInfo.price}`}</Text>
            </div>
          </button>
        }
      </div>
    </div>
  );
};


function formatDate(date_) {
  let date = new Date(date_);
  // Lấy các thành phần ngày, tháng, năm, giờ, phút
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Tháng trong JS bắt đầu từ 0
  const year = date.getFullYear();

  // Định dạng thành chuỗi theo yêu cầu
  const formattedDate = `${hours}:${minutes} ${day} Tháng ${month}, ${year}`;
  return formattedDate;
}

const suggestions = [{
  icon_src: "/sneakers.png",
  title: "Tôi muốn mua giày"
}, {
  icon_src: "/jeans.png",
  title: "Tôi muốn mua quần jeans"
}, {
  icon_src: "/tshirt.png",
  title: "Tôi muốn mua áo phông"
}, {
  icon_src: "/dress.png",
  title: "Tôi muốn mua váy"
}];
