/* eslint-disable no-console */
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';

import { Image } from '@project/libs/components';

import styles from './styles.module.scss';

type Props = {
  slides?: string[]
};

export const Pitchdeck = (props: Props) => {
  const { slides } = props;
  return (
    <div className={styles.pitchdeck_container}>
      <Swiper
        spaceBetween={15}
        slidesPerView={1}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
        modules={[Navigation]}
        navigation
        style={{ padding: '40px 0px' }}
      >
        {slides?.map((slide) => (
          <SwiperSlide
            key={slide}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <Image
              url={slide}
              className={styles.image}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
