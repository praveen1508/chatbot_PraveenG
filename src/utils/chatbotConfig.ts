export const chatBot = {
  headerText: 'LSEG Chatbot',
  welcomeText: `Hello! Welcome to LSEG.I'm here to help you.`,
  exchangeText: 'Please select a Stock Exchange',
  stockText: 'Please select a Stock',
  mainMenu: 'Main Menu',
  goBack: 'Go Back',
};

export interface Exchange {
  code: string;
  stockExchange: string;
  topStocks: TopStock[];
}

export interface TopStock {
  code: string;
  stockName: string;
  price: number;
}

export interface IChatHistory {
  selectedExchange: Pick<Exchange, 'stockExchange' | 'code'> | null | undefined;
  topStock: TopStock[] | null | undefined;
  stockDetails: TopStock | null | undefined;
}

export interface ChatbotProps {
  exchangeData: Exchange[] | undefined;
  chatbotConfig: {
    selectedExchange:
      | Pick<Exchange, 'stockExchange' | 'code'>
      | null
      | undefined;
    topStock: TopStock[] | null | undefined;
    stockDetails: TopStock | null | undefined;
    handleExchangeOptions?: (exch: Exchange) => void;
    handleStockSelection?: (data: TopStock) => void;
    handleMainMenu?: () => void;
    handleBack?: () => void;
  };
  isChatHistory?: boolean;
}

export interface ChatbotHistoryProps {
  exchangeData: Exchange[] | undefined;
  chatHistory: IChatHistory[];
}
