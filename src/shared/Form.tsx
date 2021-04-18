import { FunctionalComponent } from 'preact';
import { memo } from 'preact/compat';
import { useForm } from 'react-hook-form';

import Button from './Button';

export type FormValues = {
  title: string;
  text: string;
  author: {
    name: string;
    avatar: string;
  };
};

interface Props {
  onClose?: () => void;
  'data-testid'?: string;
}

const defaultValues: FormValues = {
  title: '',
  text: '',
  author: { name: '', avatar: '' },
};

const Form: FunctionalComponent<Props> = ({ 'data-testid': testId }) => {
  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues,
  });

  const onSubmit: OnSubmit = handleSubmit(
    (data: FormValues) => {
      console.log(data);
    },
    (e) => {
      console.log('Form Invalid', e);
    },
  );

  const onReset = () => reset();

  return (
    <div className="form-wrapper" data-testid="form-widget">
      <form onSubmit={onSubmit} data-testid={testId} className="form-content">
        <div className="form-control">
          <label htmlFor="title">Title</label>
          <input {...register('title')} placeholder="Post title" />
        </div>
        <div className="form-control">
          <label htmlFor="text">text</label>
          <input {...register('text')} placeholder="Post text" />
        </div>
        <div className="form-control">
          <label htmlFor="authorName">authorName</label>
          <input {...register('author.name')} placeholder="Your name" />
        </div>
        <div className="form-control">
          <label htmlFor="authorAvatar">authorAvatar</label>
          <input {...register('author.avatar')} placeholder="Your avatar url" />
        </div>
        <div className="actions">
          <Button type="submit">Submit</Button>
          <Button type="reset" variant="link" onPress={onReset}>
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
};

export default memo(Form);
