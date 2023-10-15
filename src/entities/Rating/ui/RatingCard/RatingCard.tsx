import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserView, MobileView } from 'react-device-detect';

import { classNames } from '@/shared/lib/classNames';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';
import { Card } from '@/shared/ui/redesigned/Card';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { StarRating } from '@/shared/ui/redesigned/StarRating';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button as ButtonDeprecated, ButtonSize, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Button } from '@/shared/ui/redesigned/Button';
import { Drawer } from '@/shared/ui/redesigned/Drawer';
import { ToggleFeatures } from '@/shared/lib/features';

interface RatingCardProps {
  className?: string;
  title?: string;
  feedbackTitle?: string;
  hasFeedback?: boolean;
  onCancel?: (starsCount: number) => void;
  onAccept?: (starsCount: number, feedback?: string) => void;
  rate?: number;
}

export const RatingCard = memo((props: RatingCardProps) => {
  const { className, title, feedbackTitle, hasFeedback, onCancel, onAccept, rate = 0 } = props;
  const { t } = useTranslation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [starsCount, setStarsCount] = useState(rate);
  const [feedback, setFeedback] = useState('');

  const onSelectStars = useCallback(
    (selectedStarsCount: number) => {
      setStarsCount(selectedStarsCount);

      if (hasFeedback) {
        setIsModalOpen(true);
      } else {
        onAccept?.(selectedStarsCount);
      }
    },
    [hasFeedback, onAccept],
  );

  const acceptHandler = useCallback(() => {
    setIsModalOpen(false);
    onAccept?.(starsCount, feedback);
  }, [feedback, starsCount, onAccept]);

  const cancelHandler = useCallback(() => {
    setIsModalOpen(false);
    onCancel?.(starsCount);
  }, [onCancel, starsCount]);

  const modalContent = (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <>
          <Text title={feedbackTitle} />

          <Input
            data-testid="RatingCard.Input"
            value={feedback}
            onChange={setFeedback}
            placeholder={t('Ваш отзыв')}
          />
        </>
      }
      off={
        <>
          <TextDeprecated title={feedbackTitle} />

          <InputDeprecated
            data-testid="RatingCard.Input"
            value={feedback}
            onChange={setFeedback}
            placeholder={t('Ваш отзыв')}
          />
        </>
      }
    />
  );

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <Card
          data-testid="RatingCard"
          className={classNames('', {}, [className])}
          fullwidth
          borderRadius="round"
          padding="24"
        >
          <VStack align="center" gap="8" max>
            <Text title={starsCount ? t('Спасибо за оценку!') : title} />

            <StarRating size={40} onSelect={onSelectStars} selectedStars={starsCount} />
          </VStack>

          <BrowserView>
            <Modal isOpen={isModalOpen} lazy onClose={cancelHandler}>
              <VStack gap="32" max>
                {modalContent}

                <HStack gap="16" max justify="end">
                  <Button onClick={acceptHandler} data-testid="RatingCard.Send">
                    {t('Отправить')}
                  </Button>

                  <Button data-testid="RatingCard.Cancel" variant="outline" onClick={cancelHandler}>
                    {t('Отмена')}
                  </Button>
                </HStack>
              </VStack>
            </Modal>
          </BrowserView>

          <MobileView>
            <Drawer isOpen={isModalOpen} lazy onClose={cancelHandler}>
              <VStack gap="32" max>
                {modalContent}

                <Button onClick={acceptHandler} size="l" fullWidth>
                  {t('Отправить')}
                </Button>
              </VStack>
            </Drawer>
          </MobileView>
        </Card>
      }
      off={
        <CardDeprecated
          data-testid="RatingCard"
          className={classNames('', {}, [className])}
          fullwidth
        >
          <VStack align="center" gap="8" max>
            <TextDeprecated title={starsCount ? t('Спасибо за оценку!') : title} />

            <StarRating size={40} onSelect={onSelectStars} selectedStars={starsCount} />
          </VStack>

          <BrowserView>
            <Modal isOpen={isModalOpen} lazy onClose={cancelHandler}>
              <VStack gap="32" max>
                {modalContent}

                <HStack gap="16" max justify="end">
                  <ButtonDeprecated onClick={acceptHandler} data-testid="RatingCard.Send">
                    {t('Отправить')}
                  </ButtonDeprecated>

                  <ButtonDeprecated
                    data-testid="RatingCard.Cancel"
                    theme={ButtonTheme.OUTLINE_RED}
                    onClick={cancelHandler}
                  >
                    {t('Отмена')}
                  </ButtonDeprecated>
                </HStack>
              </VStack>
            </Modal>
          </BrowserView>

          <MobileView>
            <Drawer isOpen={isModalOpen} lazy onClose={cancelHandler}>
              <VStack gap="32" max>
                {modalContent}

                <ButtonDeprecated onClick={acceptHandler} size={ButtonSize.L} fullWidth>
                  {t('Отправить')}
                </ButtonDeprecated>
              </VStack>
            </Drawer>
          </MobileView>
        </CardDeprecated>
      }
    />
  );
});

RatingCard.displayName = 'RatingCard';
