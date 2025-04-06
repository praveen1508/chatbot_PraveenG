import { ChatbotHistoryProps } from '../../utils/chatbotConfig';
import Chatbot from '../chatbot/Chatbot';
const ChatbotHistory = ({ chatHistory, exchangeData }: ChatbotHistoryProps) => {
  return chatHistory ? (
    <div>
      {chatHistory?.map((data, index) => (
        <Chatbot
          key={`${chatHistory[index].selectedExchange}${index}`}
          chatbotConfig={data}
          exchangeData={exchangeData}
          isChatHistory={true}
        />
      ))}
    </div>
  ) : (
    ''
  );
};

export default ChatbotHistory;
