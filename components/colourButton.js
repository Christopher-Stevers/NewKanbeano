import styles from "./colourButton.module.scss";
import PropTypes from "prop-types"
export default function ColourButton(props) {
  const handleClick = (e) => {
    e.preventDefault();
    props.clicked(props.colour);
  };
  return (
    <div className={styles.hoverDiv}>
      <button
        onClick={handleClick}
        style={{ backgroundColor: props.colour }}
        className={styles.container}
      ></button>
    </div>
  );
}

ColourButton.propTypes = {
  clicked: PropTypes.func.isRequired,
  colour: PropTypes.string.isRequired,
};

