'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Header from '@/components/header/Header';
import DefaultBody from '@/components/defaultBody';
import SearchBar from '@/components/home/SearchBar';
import { checkAuthAndRedirect } from '@/utils/checkAuthAndRedirect';
import { useRouter } from 'next/navigation';
import { getAccessToken } from '@/utils/tokenStorage';
import { GetMyOrder } from '@/api/mypage/getMyOrder';
import ReviewModal from '@/components/review/ReviewModal';
import { OrderItem } from '@/types/OrderItem';


export default function UserProfilePage() {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);

  const requireAuth = checkAuthAndRedirect();
  const router = useRouter();
  const [hasAccessToken, setHasAccessToken] = useState(true);

  const fetchOrders = async (pageNumber: number) => {
    try {
      setIsFetching(true);
      const res = await GetMyOrder(pageNumber);
      if (res.length < 5) {
        setHasMore(false);
      }
      setOrders(prev => {
        const existingIds = new Set(prev.map(item => item.id));
        const filtered = res.filter(item => !existingIds.has(item.id));
        return [...prev, ...filtered];
      });
      setPage(prev => prev + 1);
    } catch (error) {
      console.error('주문 목록 불러오기 실패:', error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    const token = getAccessToken();
    if (!token) {
      setHasAccessToken(false);
      return;
    }
    fetchOrders(0);
  }, []);

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasMore && !isFetching) {
        fetchOrders(page);
      }
    },
    [hasMore, isFetching, page]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      threshold: 0.5,
    });
    if (observerRef.current) observer.observe(observerRef.current);
    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [handleIntersect]);

  if (!hasAccessToken) {
    return (
      <div className="w-full h-[calc(100vh-100px)] flex flex-col items-center justify-center gap-6 px-4">
        <div className="text-center text-[#888] text-[16px] font-medium">
          로그인 후 이용가능한 기능입니다.
        </div>
        <button
          onClick={() => router.push('/login')}
          className="bg-black text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-[#333] transition-all"
        >
          로그인하러 가기
        </button>
      </div>
    );
  }

  return (
    <>
      <Header>
        <Header.BackButton />
        <Header.Title>주문내역</Header.Title>
      </Header>

      <div className="relative pb-[80px]">
        <DefaultBody hasHeader={1}>
          <main className="flex flex-col">
            <SearchBar showCartButton={false} />

            <div className="flex flex-col gap-4 mt-4">
              {orders.map((order) => (
                <div key={order.id} className="border-b-8 border-[#F6F3EE] pb-6">
                  <div className="flex justify-between items-center px-4">
                    <span
                      className={`text-[14px] font-medium ${order.status.includes('취소') ? 'text-[#FF6B2C]' : 'text-[#4BE42C]'}`}
                    >
                      {order.status}
                    </span>
                    <button
                      className="text-[13px] text-[#999]"
                      onClick={() => router.push(`/order/${order.id}`)}
                    >
                      {order.status.includes('취소') ? '취소상세 >' : '주문상세 >'}
                    </button>
                  </div>

                  <div className="flex gap-3 mt-4 px-4">
                    <div className="w-[80px] h-[80px] rounded-md overflow-hidden flex-shrink-0">
                      <img src={order.imageUrl} alt="order-img" className="object-cover w-20 h-20" />
                    </div>
                    <div className="flex flex-col justify-between flex-1">
                      <div>
                        <p className="text-[13px] text-[#999]">{order.purchaseDate} 주문</p>
                        <p className="text-[15px] font-medium">
                          {order.sellerNickname} {order.productName}
                        </p>
                        {order.productOption && (
                          <p className="text-[13px] text-[#999]">
                            {order.productOption} 외 {order.quantity}개
                          </p>
                        )}
                      </div>
                      <p className="text-[15px] font-semibold">
                        {order.price.toLocaleString()}원
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2 px-4">
                    {order.status === '배송 완료' && (
                      <>
                        <button className="flex-1 h-[40px] rounded-lg border border-[#DDD] text-[14px]">
                          교환, 반품하기
                        </button>
                        <button
                          className="flex-1 h-[40px] rounded-lg border border-[#DDD] text-[14px]"
                          onClick={() => {
                            setSelectedOrder(order);
                            setIsModalOpen(true);
                          }}
                        >
                          리뷰쓰기
                        </button>
                      </>
                    )}
                    {(order.status === '상품 준비중' || order.status === '배송 중') && (
                      <button className="w-full h-[40px] rounded-lg border border-[#DDD] text-[14px]">
                        주문 취소
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {hasMore && <div ref={observerRef} className="h-10" />}
            </div>
          </main>
        </DefaultBody>
      </div>

      {/* 리뷰 모달 연결 */}
      {selectedOrder && (
        <ReviewModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          writer={selectedOrder.sellerNickname}
          recipeName={selectedOrder.productName}
          recipeId={selectedOrder.id}
          ImgUrl={selectedOrder.imageUrl}
          purchase_option={selectedOrder.productOption}
          type="product"
        />
      )}
    </>
  );
}
