import React from 'react';
import { createUseStyles } from 'src/lib/jss';
import { BoardContextProvider } from './BoardContext/BoardContextProvider';
import { Board } from './components/Board/Board';

type Props = {};

export const CustomBoard: React.FC<Props> = (props) => {
  const cls = useStyles();

  return (
    <div className={cls.container}>
    <BoardContextProvider>
      <Board/>
    </BoardContextProvider>
    </div>
  );
};

const useStyles = createUseStyles({
  container: {
    background: 'linear-gradient(125deg, #40739e, #00a8ff, #273c75)',
    display:'flex',
    flex: 1,
    flexDirection:'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw'
  },
});