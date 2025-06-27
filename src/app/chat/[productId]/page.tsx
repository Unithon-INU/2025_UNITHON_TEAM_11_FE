'use client';

import { useEffect, useState, useRef } from 'react';
import Header from '@/components/header/Header';
import DefaultBody from '@/components/defaultBody';
import { useParams } from 'next/navigation';
import { GetProductDetail } from '@/api/product/getProductDetail';
import { PostChat } from '@/api/chat/postChat';
import { PostChatFirst } from '@/api/chat/postFirst';

type Message = {
  sender: 'bot' | 'user';
  content: string;
};

export default function ChatPage() {
  const { productId } = useParams<{ productId: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // ✅ 최초 진입 시 상품 정보 가져와 PostChat 전송 → bot 응답 표시
  useEffect(() => {
    const fetchInitialChat = async () => {
      try {
        const productDetail = await GetProductDetail(productId, 0);
        const initialMessage = `상품 문의 시작\n상품명: ${productDetail.name}\n가격: ${productDetail.price.toLocaleString()}원\n상세: ${productDetail.description ?? ''}`;

        setMessages([
          { sender: 'bot', content: '안녕하세요! 해당 상품에 대해 문의하실 내용을 입력해주세요.' },
          { sender: 'bot', content: initialMessage }
        ]);

        const res = await PostChatFirst(productDetail);
        setMessages(prev => [...prev, { sender: 'bot', content: res.data.bot_response ?? '챗봇 응답이 없습니다.' }]);
      } catch (error) {
        console.error('초기 채팅 로드 실패:', error);
      }
    };

    fetchInitialChat();
  }, [productId]);

  // ✅ 메시지가 업데이트될 때 자동 스크롤
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = input.trim();
    setMessages(prev => [...prev, { sender: 'user', content: userMessage }]);
    setInput('');
    setLoading(true);

    try {
      const res = await PostChat(userMessage);
      setMessages(prev => [
        ...prev,
        { sender: 'bot', content: res.data.bot_response ?? '챗봇 응답이 없습니다.' }
      ]);
    } catch (error) {
      console.error('메시지 전송 실패:', error);
      setMessages(prev => [
        ...prev,
        { sender: 'bot', content: '⚠️ 챗봇 응답에 실패했습니다. 잠시 후 다시 시도해주세요.' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header>
        <Header.BackButton />
        <Header.Title>챗봇 문의</Header.Title>
      </Header>
      <DefaultBody hasHeader={1}>
        <div className="flex flex-col h-[calc(100vh-176px)]">
          <main className="flex-1 flex flex-col px-4 py-4 overflow-y-auto gap-3">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`max-w-[80%] px-4 py-2 rounded-2xl text-[14px] leading-[20px] ${
                  msg.sender === 'user'
                    ? 'self-end bg-[#4BE42C] text-white'
                    : 'self-start bg-[#F4F1EC] text-[#333]'
                }`}
              >
                {msg.content}
              </div>
            ))}
            {/* 스크롤 위치 기준점 */}
            <div ref={scrollRef} />
          </main>

          {/* 입력 영역 */}
          <div className='fixed bottom-0 left-0 right-0 bg-white border-t border-[#EEE] z-50 flex justify-center'>
            <div className="w-full max-w-[500px] px-4 py-2 flex gap-2 bg-white">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="메시지를 입력하세요"
                className="flex-1 bg-[#F4F1EC] rounded-full px-4 py-2 text-[14px] focus:outline-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                disabled={loading}
                autoFocus
              />
              <button
                onClick={handleSend}
                className="bg-[#4BE42C] text-white text-[14px] rounded-full px-4 py-2 font-medium disabled:opacity-50"
                disabled={loading || !input.trim()}
              >
                전송
              </button>
            </div>
          </div>
        </div>
      </DefaultBody>
    </>
  );
}
