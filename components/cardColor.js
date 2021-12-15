import styles from "./cardColor.module.scss";
import ColourButton from "./colourButton.js";
import { useState, useContext } from "react";
import PropTypes from "prop-types";
import NewContext from "../components/newContext";
export default function CardColor(props) {
  let [newContext, updateNewContext, saveContextToDB] = useContext(NewContext);
  const currentCardData=newContext[props.listIndex][props.index]
  const { title, content, dueDate, id } = currentCardData;
  const modifyContext = async (colour) => {
    const updatedContext = newContext.map((elem, index) => {
          if (index === parseInt(props.listIndex)) {
            return elem.map((nestedElem) => {
              if (nestedElem.id === id) {
                return {
                  title: title,
                  content: content,
                  dueDate: dueDate,
                  colour: colour,
                  id: nestedElem.id,
                  editable: newContext[props.listIndex][props.index].editable,
                };
              }
              return nestedElem;
            });
          }
          return elem;
        });
      
    await updateNewContext(updatedContext);
    await saveContextToDB(updatedContext);
  };

  const [open, updateOpen] = useState(false);
  const [clickedOpen, updateClickedOpen] = useState(false);
  const handleHover = () => {
    updateOpen(true);
  };
  const handleHoverLeave = () => {
    updateOpen(false);
  };
  const defaultColour = { backgroundColor: "var(--header-background-color)" };
  const colourPicked = (arg) => {
    modifyContext(arg);
  };
  const handleClick = (e) => {
    e.preventDefault();
    clickedOpen ? updateClickedOpen(false) : updateClickedOpen(true);
    updateOpen(false);
  };
  return (
    <div
      onMouseLeave={handleHoverLeave}
      onMouseOver={handleHover}
      onClick={handleClick}
      className={styles.colorButton}
    >
      <div
        onClick={handleClick}
        style={
          props.currentColor.backgroundColor
            ? props.currentColor
            : defaultColour
        }
        className={styles.container}
      ></div>
      {
        <div
          className={
            open || clickedOpen
              ? `${styles.list} ${styles.open}`
              : `${styles.list}`
          }
        >
          <ColourButton
            clicked={colourPicked}
            className={styles.first}
            colour={"var(--header-background-color)"}
          />
          <ColourButton clicked={colourPicked} colour={"var(--casual-code)"} />
          <ColourButton clicked={colourPicked} colour={"var(--warn-code)"} />
          <ColourButton
            clicked={colourPicked}
            colour={" var(--urgent-code) "}
          />
        </div>
      }
    </div>
  );
}

CardColor.propTypes = {
  currentColor: PropTypes.object.isRequired,
  backgroundColor: PropTypes.string,
  index: PropTypes.number.isRequired,
  listIndex: PropTypes.number.isRequired
};
