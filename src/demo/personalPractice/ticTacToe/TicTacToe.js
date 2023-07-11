import React from "react";
import { Button } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./style.module.css";

export default function TicTacToe(props) {
  return  <React.Fragment> 
    <Button>New Game</Button>
    <span className={styles.gameResult}></span>
    <span className={styles.whosTurn}>X player starts the game.</span>
    </React.Fragment>
   
    
   

}
