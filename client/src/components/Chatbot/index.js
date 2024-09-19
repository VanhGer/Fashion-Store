import { ChatMessage } from "./ChatMessage";
import { ChatLoader } from "./ChatLoader";
import { ChatInput } from "./ChatInput";
import { useEffect, useRef, useState } from "react";
import { useSelector } from 'react-redux'
import { Avatar, Badge, ConfigProvider, Tooltip } from "antd";
import MinimizeIcon from '@mui/icons-material/Minimize';
import { useLocation } from "react-router-dom";
import axios from 'axios'

const Chatbot = () => {
  const location = useLocation();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [closed, setClosed] = useState(true);
  const { userInfo } = useSelector((state) => state.loginUser);
  const [productInfo, setProductInfo] = useState(null);

  const [isVisible, setIsVisible] = useState(true);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async (message) => {
    const updatedMessages = [...messages, message];

    setMessages(updatedMessages);
    setLoading(true);

    const response = await fetch("http://localhost:1204/chatbot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(isSignedIn(userInfo) ? {
        user_id: userInfo._id,
        msg: message.content,
        time: new Date().toISOString()
      } : {
        conversation: updatedMessages.map(m => m.content).slice(1)
      })
    });

    if (!response.ok) {
      setLoading(false);
      setMessages((messages) => [
        ...messages,
        {
          role: "assistant",
          content: "Gặp sự cố khi kết nối với máy chủ. Vui lòng thử lại sau.",
          time: new Date().toISOString()
        }
      ]);
    } else {
      const data = await response.json();

      if (!data) {
        return;
      }

      setLoading(false);

      setMessages((messages) => [
        ...messages,
        {
          role: "assistant",
          ...data
        }
      ]);
    }
  };

  const handleReset = async () => {
    setMessages([
      {
        role: "assistant",
        content: `Chào bạn! Mình có thể giúp gì cho bạn không?`,
        time: new Date().toISOString()
      }
    ]);
    if (isSignedIn(userInfo)) {
      await fetch("http://localhost:1204/chatbot/reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_id: userInfo._id,
          msg: "reset",
          time: new Date().toISOString()
        })
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setMessages([
      {
        role: "assistant",
        content: `Chào bạn! Mình có thể giúp gì cho bạn không?`,
        time: new Date().toISOString()
      }
    ]);
    if (isSignedIn(userInfo)) {
      fetch("http://localhost:1204/chatbot/get-all-messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_id: userInfo._id
        })
      }).then(response => {
        if (!response.ok) {
          setMessages([
            {
              role: "assistant",
              content: "Gặp sự cố khi kết nối với máy chủ. Vui lòng thử lại sau.",
              time: new Date().toISOString()
            }
          ]);
        } else {
          response.json().then(data => {
            if (!data) {
              return;
            }

            setMessages((messages) => [
              ...messages,
              ...data.map((msg, idx) => ({
                role: idx % 2 === 1 ? "assistant" : "user",
                ...msg
              }))
            ]);
          })
        }
      });
    }
  }, [userInfo]);

  useEffect(() => {
    if (location.pathname.includes("/product/")) {
      setTimeout(() => {
        let productId = location.pathname.split("/")[2];
      axios.get(`/api/products/${productId}`).then(({data}) => {
        let { product: {
          name,
          images,
          price
        } } = data;
        let imageUrl = images[0].url;
        setMessages(messages => messages.map((message, index) => {
          return index === messages.length - 1 ? {
            ...message,
            productInfo: {
              name,
              imageUrl,
              price
            }
          } : message;
        }));
      });
      }, 1000)
    }
  }, [location.pathname]);

  for (let excludedRoute of excludedRoutes) {
    if (location.pathname.includes(excludedRoute)) {
      return null;
    }
  }

  return (
    <div className="fixed right-6 lg:bottom-6 sm:bottom-[70px] z-[1000000]">
      {
        <>
          <button onClick={() => setTimeout(() => setClosed(false), 500)} className={`${closed ? "" : "hidden"}`}>
            <img alt='chatbot' src='/chatbot.png' className="md:w-[60px] md:h-[60px] sm:w-[50px] sm:h-[50px]" />
          </button>

          <div className={`transition-opacity duration-500 ease-in-out ${closed ? "hidden" : ""}`}>
            <div className="min-w-[400px] w-[30vw] min-h-[82vh] h-fit rounded-xl bg-white border shadow-lg flex flex-col">
              <div className="bg-[#D23F57] w-full h-[12%] rounded-t-xl flex flex-row p-2 items-center gap-3">
                <ConfigProvider
                  theme={{
                    components: {
                      Badge: {
                        dotSize: 8
                        /* here is your component tokens */
                      },
                    },
                  }}
                >
                  <Badge dot status="success" offset={[-7, 32]} >
                    <Avatar src="/chatbot.png" size={37} />
                  </Badge>
                </ConfigProvider>


                <span className="font-semibold text-lg text-white mr-auto">BotBoo2nd</span>
                <button className="hover:opacity-60" onClick={handleReset}>
                  <Tooltip title="Làm mới cuộc trò chuyện" zIndex={100000000}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" className="fill-white">
                      <g id="_01_align_center" data-name="01 align center">
                        <path
                          d="M12,2a10.032,10.032,0,0,1,7.122,3H15V7h5.143A1.859,1.859,0,0,0,22,5.143V0H20V3.078A11.982,11.982,0,0,0,0,12H2A10.011,10.011,0,0,1,12,2Z" />
                        <path
                          d="M22,12A9.986,9.986,0,0,1,4.878,19H9V17H3.857A1.859,1.859,0,0,0,2,18.857V24H4V20.922A11.982,11.982,0,0,0,24,12Z" />
                      </g>
                    </svg>
                  </Tooltip>
                </button>
                <button onClick={() => setClosed(true)}>
                  <Tooltip title="Ẩn cuộc trò chuyện" zIndex={100000000}>
                    <MinimizeIcon className="!fill-white hover:opacity-60 !text-[2rem] -mt-6" />
                  </Tooltip>
                </button>
              </div>
              {/* <div className="flex flex-row justify-between items-center mb-4 sm:mb-8">
              <ResetChat onReset={handleReset} />
            </div> */}

              <div className="px-3 py-3 h-fit flex flex-col gap-3">
                <div className="flex flex-col border-neutral-300 overflow-scroll h-[60vh] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent scrollbar-thumb-rounded-full">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className="my-1 sm:my-1.5"
                    >
                      <ChatMessage message={message} hasSuggestions={index === 0} onChoose={(msg) => handleSend({ role: "user", content: msg, time: new Date().toISOString() })} />
                    </div>
                  ))}

                  {loading && (
                    <div className="my-1 sm:my-1.5">
                      <ChatLoader />
                    </div>
                  )}
                  <div ref={messagesEndRef}></div>
                </div>

                <div className="bottom-3 w-full">
                  <ChatInput onSend={handleSend} disabled={loading} />
                </div>
              </div>
            </div>
          </div>
        </>
      }
    </div>
  );
};

const excludedRoutes = ["/signin", "/forgot-password", "/reset-password", "/admin", "/404", "/account"];

export default Chatbot;

function isSignedIn(userInfo) {
  return userInfo && "_id" in userInfo;
}
