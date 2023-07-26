import { Check, Trash } from 'phosphor-react';
import styles from './style.module.css';
import clipboard from '../../assets/clipboard.png';

export interface ITask {
  id: string;
  content: string;
  completed: boolean;
}

interface Props {
  tasks: ITask[];
  onRemoveTask: (task: ITask) => void;
  onToggleTask: (task: ITask) => void;
}


export function Tasks({ tasks, onRemoveTask, onToggleTask }: Props) {

  const { length, completed } = tasks.reduce((prev, curr) => {
    if (curr.completed) {
      prev.completed += 1;
    }

    prev.length += 1;

    return prev;
  }, { length: 0, completed: 0 });

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles['created-tasks']}>
          <p>Tarefas criadas</p>
          <span>{length}</span>
        </div>

        <div className={styles['completed-tasks']}>
          <p>Concluídas</p>
          <span>{completed} de {length}</span>
        </div>
      </header>

      <div className={styles.list}>
        {!length && (
          <div className={styles.emptyList}>
            <img src={clipboard} alt="Icone de Clipboard" />
            <p>
              <strong>
                Você ainda não tem tarefas cadastradas
              </strong>
              <span>
                Crie tarefas e organize seus itens a fazer
              </span>
            </p>
          </div>
        )}

        {tasks.map(task => (
          <div data-completed={task.completed} key={task.id} className={styles.task}>
            <label htmlFor={task.id}>
              <input
                type="checkbox"
                defaultChecked={task.completed}
                onChange={() => onToggleTask(task)}
                name={task.id}
                id={task.id}
              />
              <Check size={18} />
            </label>

            <p>{task.content}</p>

            <button type='button' onClick={() => onRemoveTask(task)}>
              <Trash size={24} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}