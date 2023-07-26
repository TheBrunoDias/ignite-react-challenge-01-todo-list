import { ChangeEvent, FormEvent, useState } from 'react';
import styles from './style.module.css';
import { PlusCircle } from 'phosphor-react';

interface IForm {
  onSubmit: (content: string) => void;
}

export function Form({ onSubmit }: IForm) {
  const [content, setContent] = useState('');

  function handleOnInputChange(event: ChangeEvent<HTMLInputElement>) {
    setContent(event.target.value);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    onSubmit(content);
    setContent('');
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        placeholder='Adicione uma nova tarefa'
        type='text'
        onChange={handleOnInputChange}
        className={styles.input}
        required
        value={content}
      />

      <button type="submit" className={styles['btn-submit']}>
        Criar
        <PlusCircle size={16} />
      </button>
    </form>
  )
}