import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button as ButtonDeprecated } from '@/shared/ui/deprecated/Button';
import { Button } from '@/shared/ui/redesigned/Button';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { ToggleFeatures } from '@/shared/lib/features';
import { Card } from '@/shared/ui/redesigned/Card';

import {
  addCommentFormActions,
  addCommentFormReducer,
} from '../../model/slices/addCommentFormSlice';
import { getAddCommentFormText } from '../../model/selectors/addCommentFormSelectors';
import cls from './AddCommentForm.module.scss';

interface AddCommentFormProps {
  className?: string;
  onSendComment: (textComment: string) => void;
}

const reducersList: ReducersList = {
  addCommentForm: addCommentFormReducer,
};

export const AddCommentForm = memo((props: AddCommentFormProps) => {
  const { className, onSendComment } = props;
  const { t } = useTranslation();
  const text = useSelector(getAddCommentFormText);
  const dispatch = useAppDispatch();

  const onCommentTextChange = useCallback(
    (value: string) => {
      dispatch(addCommentFormActions.setText(value));
    },
    [dispatch],
  );

  const handleSendComment = useCallback(() => {
    onSendComment(text);

    // clear input value
    onCommentTextChange('');
  }, [text, onSendComment, onCommentTextChange]);

  return (
    <DynamicModuleLoader reducers={reducersList}>
      <ToggleFeatures
        feature="isAppRedesigned"
        on={
          <Card padding="24" borderRadius="round" fullwidth>
            <HStack
              data-testid="AddCommentForm"
              justify="between"
              gap="16"
              max
              className={classNames(cls.addCommentFormRedesigned, {}, [className])}
            >
              <Input
                data-testid="AddCommentForm.Input"
                className={cls.input}
                placeholder={t('Введите текст комментария')}
                value={text}
                onChange={onCommentTextChange}
              />

              <Button data-testid="AddCommentForm.Button" onClick={handleSendComment}>
                {t('Отправить')}
              </Button>
            </HStack>
          </Card>
        }
        off={
          <HStack
            data-testid="AddCommentForm"
            max
            className={classNames(cls.addCommentForm, {}, [className])}
          >
            <InputDeprecated
              data-testid="AddCommentForm.Input"
              className={cls.input}
              placeholder={t('Введите текст комментария')}
              value={text}
              onChange={onCommentTextChange}
            />

            <ButtonDeprecated data-testid="AddCommentForm.Button" onClick={handleSendComment}>
              {t('Отправить')}
            </ButtonDeprecated>
          </HStack>
        }
      />
    </DynamicModuleLoader>
  );
});

AddCommentForm.displayName = 'AddCommentForm';
