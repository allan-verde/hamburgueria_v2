import { AxiosResponse } from "axios"
import { ReactNode, useCallback, useContext, useState } from "react"
import { createContext } from "react"
import { api } from "../services/api"
import { useAuth } from "./AuthContext"
import { allProducts } from '../dataBase/AllProducts'
import toast from 'react-hot-toast'

interface ProductProviderProps {
  children: ReactNode
}

interface Product {
  id: number
  name: string
  category: string
  price: number
  img: string
}

interface ProdCart {
  id: number
  name: string
  category: string
  price: number
  img: string
  quant: number
}

interface ProdCartData {
  id: number
  name: string
  category: string
  price: number
  img: string
  quant: number
  userId: number
}

interface AllProdRender {
  name: string
  category: string
  price: number
  img: string
  userId: number
  id: number
}

interface ProductContextData {
  cart: ProdCartData[]
  newProduct: (data: ProdCart, userId: number, token: string) => Promise<void>
  loadProdCart: (userId: number, accessToken: string) => Promise<void>
  deleteProduct: (taskId: number, accessToken: string) => Promise<void>
  updateProduct: (taskId: number, userId: number, accessToken: string, newQuant: number) => Promise<void>
  searchProduct: (productName: string) => void
  allProductRender: AllProdRender[]
}

const ProductContext = createContext<ProductContextData>({} as ProductContextData)

const useProducts = () => {
  const context = useContext(ProductContext)

  if (!context) {
    throw new Error("useProducts must be used within an TaskProvider")
  }
  return context
}

const ProductProvider = ({ children }: ProductProviderProps) => {
  const { user, accessToken } = useAuth()
  const [allProductRender, setAllProductRender] = useState<AllProdRender[]>(allProducts)
  const [cart, setCart] = useState<ProdCartData[]>([])

  const loadProdCart = useCallback(async (userId: number, accessToken: string) => {
    try {
      const response = await api.get(`/products/?userId=${userId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      setCart(response.data)
    } catch (err) {
      toast.error('Erro ao carrgar carrinho de compras')
      console.log(err)
    }
  }, [])

  const newProduct = useCallback(
    async (data: ProdCart, userId: number, token: string) => {
      const { name, category, price, img, quant } = data
      const newData = {
        category: category,
        name: name,
        price: price,
        img: img,
        quant: quant,
        userId: userId
      }
      console.log(newData)
      api
        .post("/products", newData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((response: AxiosResponse<Product>) => {
          setCart((oldCart) =>  [...oldCart, response.data] as ProdCartData[])
          toast.success('Produto adicionado')
        })
        .catch((err) => {
          console.log(err)
          toast.error('Ocorreu um erro, tente novamente mais tarde')
        })
    },
    []
  )

  const deleteProduct = useCallback(
    async (ProductId: number, accessToken: string) => {
      await api
        .delete(`/products/${ProductId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
        .then((_) => {
          const filteredProducts = cart.filter((product) => product.id !== ProductId)
          setCart(filteredProducts)
          toast.success('Produto removido')
        })
        .catch((err) => {
          console.log(err)
          toast.error('Ocorreu um erro, tente novamente mais tarde')
        })

    },
    [cart]
  )

  const updateProduct = useCallback(
    async (ProductId: number, userId: number, accessToken: string, newQuant: number) => {
      await api
        .patch(
          `/products/${ProductId}`,
          { quant: newQuant, userId },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        )
        .then((_) => {
          loadProdCart(user.id, accessToken)
          toast.success('Produto atualizado')
        })
        .catch((err) => {
          console.log(err)
          toast.error('Ocorreu um erro, tente novamente mais tarde')
        })
    },
    [cart]
  )

  const searchProduct = useCallback((ProductName: string) => {
    if (ProductName === '') {
      setAllProductRender(allProducts)
    } else {
      const newProdListRender = allProducts.filter(prod => {
        const name = prod.name.toUpperCase()
        const category = prod.category.toUpperCase()
        const perquisaUpperCase = ProductName.toUpperCase()
        if (name.includes(perquisaUpperCase) || category.includes(perquisaUpperCase)) {
          return prod
        }
      })
      setAllProductRender(newProdListRender)
    }
    },
    []
  )

  return (
    <ProductContext.Provider
      value={{
        cart: cart,
        allProductRender,
        searchProduct,
        newProduct: newProduct,
        loadProdCart: loadProdCart,
        deleteProduct: deleteProduct,
        updateProduct: updateProduct
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export { useProducts, ProductProvider }
