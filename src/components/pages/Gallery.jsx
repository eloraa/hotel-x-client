import { Helmet } from 'react-helmet-async';

import '../../assests/gallery/css/base.css';
import { useLayoutEffect, useRef } from 'react';
import { galleryEffect } from '../classes/gallery';
import { useNormalReq } from '../hooks/useNormalReq';
import { Toast } from '../utils/Toast';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

export const Gallery = () => {
  const galleryRef = useRef(null);
  const instance = useNormalReq();

  const getData = async () => {
    const { data } = await instance.get('/rooms');
    return data;
  };

  const { isPending, error, data } = useQuery({
    refetchOnMount: true,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    queryKey: ['rooms'],
    queryFn: () => getData(),
  });
  useLayoutEffect(() => {
    if (galleryRef.current && !isPending) {
      galleryEffect(
        galleryRef.current,
        Array.from(galleryRef.current.querySelectorAll('.gallery__item')).map((child, i) => [i, child.getAttribute('data-img')])
      );
    }
  }, [isPending]);

  if (isPending) return;

  if (error) return Toast('Something went wrong.');

  return (
    <div className="animate-dissolve-in">
      <Helmet>
        <title>Gallery | Hotel</title>
      </Helmet>

      <main className="overflow-hidden h-screen">
        <div ref={galleryRef} className="gallery">
          {data &&
            data.length &&
            data.map(room => (
              <Link to={'/room/' + room._id} key={room._id} className="gallery__item" data-img={room.room_images[0]}>
                <span className="gallery__item-text" data-splitting>
                  <div className="word">{room.room_type}</div>
                </span>
              </Link>
            ))}
        </div>
      </main>
    </div>
  );
};
