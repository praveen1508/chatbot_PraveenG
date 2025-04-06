import styles from './chatbot.module.scss';
import bot_30 from '../../assets/bot_30.png';
import {
  chatBot,
  ChatbotProps,
  Exchange,
  TopStock,
} from '../../utils/chatbotConfig';

const Chatbot = ({
  chatbotConfig,
  exchangeData,
  isChatHistory,
}: ChatbotProps) => {
  const {
    selectedExchange,
    topStock,
    stockDetails,
    handleExchangeOptions,
    handleStockSelection,
    handleMainMenu,
    handleBack,
  } = chatbotConfig;

  const Chatbot = () => <img className={styles.botIcon} src={bot_30} />;

  const MainMenu = () => (
    <div
      className={styles.optionText}
      onClick={() => {
        // This check is done as we don't pass this callback for ChatHistory
        if (handleMainMenu) {
          handleMainMenu();
        }
      }}
    >
      {chatBot.mainMenu}
    </div>
  );

  return (
    <div>
      <div className={styles.textWrapper}> {chatBot.welcomeText}</div>
      <div className={styles.textWrapper}>
        {exchangeData &&
          exchangeData?.map((exch: Exchange) => (
            <div
              key={exch?.code}
              className={styles.optionText}
              onClick={() => {
                // This check is done as we don't pass this callback for ChatHistory
                if (handleExchangeOptions) {
                  handleExchangeOptions(exch);
                }
              }}
            >
              {exch?.stockExchange}
            </div>
          ))}
      </div>
      <Chatbot />
      {selectedExchange && (
        <div className={styles.inputContainer}>
          <div className={styles.inputText}>
            {selectedExchange?.stockExchange}
          </div>
        </div>
      )}
      {topStock && (
        <>
          <div className={styles.textWrapper}>
            <div>{chatBot?.stockText}</div>
            {topStock?.map((stock: TopStock) => (
              <div
                key={stock?.code}
                className={styles.optionText}
                onClick={() => {
                  // This check is done as we don't pass this callback for ChatHistory
                  if (handleStockSelection) {
                    handleStockSelection(stock);
                  }
                }}
              >
                {stock?.stockName}
              </div>
            ))}
          </div>
          <div className={styles.textWrapper}>
            <MainMenu />
          </div>
          <Chatbot />
        </>
      )}
      {stockDetails && (
        <>
          <div className={styles.inputContainer}>
            <div className={styles.inputText}>{stockDetails?.stockName}</div>
          </div>
          <div className={styles.textWrapper}>
            <div>
              {`Stock Price of ${stockDetails?.stockName} is ${stockDetails?.price}. `}
              Please select an option.
            </div>
            <MainMenu />
            <div
              className={styles.optionText}
              onClick={() => {
                if (handleBack) {
                  handleBack();
                }
              }}
            >
              {chatBot.goBack}
            </div>
          </div>
          <Chatbot />
        </>
      )}
      {isChatHistory && (
        <div className={styles.inputContainer}>
          <div className={styles.inputText}>{chatBot.mainMenu}</div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
