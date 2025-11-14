'use client'

import { useEffect, useState } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

interface FAQ {
  id: string
  question: string
  answer: string
}

export default function FAQ() {
  const [faqs, setFaqs] = useState<FAQ[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('seminar_faqs')
    if (stored) {
      setFaqs(JSON.parse(stored))
    }
  }, [])

  return (
    <section id="faq" className="py-20 bg-background dark:bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Câu hỏi <span className="text-accent">thường</span> gặp
        </h2>
        <p className="text-center text-muted-foreground mb-12">
          Tìm câu trả lời cho những câu hỏi phổ biến về sự kiện
        </p>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq) => (
            <AccordionItem
              key={faq.id}
              value={faq.id}
              className="border border-accent/10 dark:border-accent/20 rounded-lg px-6 hover:border-accent/30 transition bg-card dark:bg-slate-900"
            >
              <AccordionTrigger className="hover:text-accent font-semibold">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
