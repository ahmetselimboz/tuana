'use client' // Bu satır, bileşenin sadece istemci tarafında render edilmesi gerektiğini belirtir.

import { useEffect, useState } from 'react'

export default function Error({ error, reset }) {
  // Hata mesajını saklamak için bir state oluşturulur
  const [st, setSt] = useState(null)

  useEffect(() => {
    // Hata oluştuğunda konsola yazdırılır veya bir hata raporlama servisine gönderilir
    console.error(error)
    // Burada isteğe bağlı olarak hata raporlama servisine bir istek gönderilebilir

  }, [error])

  return (
    <div>
      {/* Hata mesajını göstermek için buraya bir alan ekleyebilirsiniz */}
      <h2>Bir hata oluştu!</h2>
      <p>{error.message}</p>

      <button
        onClick={() => reset()}
      >
        Tekrar Dene
      </button>
    </div>
  )
}