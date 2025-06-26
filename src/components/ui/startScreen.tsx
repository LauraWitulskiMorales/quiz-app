
// import '../styles/index.css';
import { Card } from "./Card"
import StyledButton from "./Buttons"
import { StartScreenProps } from "../../lib/types"

const StartScreen: React.FC<StartScreenProps> = ({ onGame }) => {
  return (
    <Card>
      <StyledButton onClick={onGame}>Start Quiz</StyledButton>
    </Card>
  );
};

export default StartScreen;


