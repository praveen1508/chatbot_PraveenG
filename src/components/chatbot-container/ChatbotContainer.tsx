import styles from './ChatbotContainer.module.scss';
import bot_img from '../../assets/chatbot_img.png';
import {
  Exchange,
  IChatHistory,
  TopStock,
  chatBot,
} from '../../utils/chatbotConfig';
import { useExchange } from '../../hooks/useExchange';
import { useEffect, useRef, useState } from 'react';
import ChatbotHistory from '../chatbot-history/ChatbotHistory';
import Chatbot from '../chatbot/Chatbot';

const ChatbotContainer = () => {
  const exchangeData = useExchange();

  const [chatHistory, setChatHistory] = useState<IChatHistory[]>([]);
  const [selectedExchange, setSelectedExchange] = useState<Pick<
    Exchange,
    'code' | 'stockExchange'
  > | null>();
  const [topStock, setTopStock] = useState<TopStock[] | null>();
  const [stockDetails, setStockDetails] = useState<TopStock | null>();

  const chatBotContainerRef = useRef<HTMLDivElement>(null);

  const scrollToLatestMessage = () => {
    if (chatBotContainerRef.current) {
      chatBotContainerRef.current.scrollTo({
        top: chatBotContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  //Called when the user selects the Exchange
  const handleExchangeOptions = (exch: Exchange) => {
    setSelectedExchange({
      code: exch?.code,
      stockExchange: exch?.stockExchange,
    });
  };

  //Called when the user selects the Stock
  const handleStockSelection = (data: TopStock) => {
    setStockDetails(data);
  };

  const saveChatHistory = () => {
    const history = {
      selectedExchange,
      topStock,
      stockDetails,
    };
    setChatHistory((p) => [...p, history]);
  };

  const handleMainMenu = () => {
    saveChatHistory();
    setSelectedExchange(null);
    setTopStock(null);
    setStockDetails(null);
  };
  const handleBack = () => {
    setStockDetails(null);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToLatestMessage();
    }, 100);
    return () => clearTimeout(timer);
  }, [selectedExchange, stockDetails]);

  useEffect(() => {
    if (selectedExchange) {
      const stocks = exchangeData?.find(
        (data: Exchange) => data?.code === selectedExchange?.code
      )?.topStocks;
      setTopStock(stocks);
    }
  }, [selectedExchange]);

  const chatbotConfig = {
    selectedExchange,
    topStock,
    stockDetails,
    handleExchangeOptions,
    handleStockSelection,
    handleMainMenu,
    handleBack,
  };

  return (
    <div className={styles.container} ref={chatBotContainerRef}>
      <div className={styles.header}>
        <img className={styles.botIcon} src={bot_img} />
        {chatBot.headerText}
      </div>
      <ChatbotHistory exchangeData={exchangeData} chatHistory={chatHistory} />
      <Chatbot exchangeData={exchangeData} chatbotConfig={chatbotConfig} />
    </div>
  );
};

export default ChatbotContainer;
