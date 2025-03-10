import classes from "./MyButton.module.scss";
interface UIMibutton{
    children?: any,
    disabled?: any,
    onClick?: any,
    style?: any,
}
export default function MyButton({children, ...props}:UIMibutton) {
  return <button {...props} className={classes.myBtn}>
    {children}
  </button>;
}
