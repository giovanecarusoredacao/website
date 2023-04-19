import {
  Stack,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useState } from "react";
import Input from "../../components/atoms/SimpleInput";
import Button from "../../components/atoms/RoundedButton";
import { MainPageTemplate } from "../../components/templates/main";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleInputChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    let validationErrors = {}
    if (!formData.email) {
      validationErrors.email = "O email é necessário"
    } else if (!/^\S+@\S+$/.test(formData.email)) {
      validationErrors.email = "Email inválido"
    }
    if (!formData.password) {
      validationErrors.password = "A senha é necessária"
    }
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      console.log("validar se foi bem sucedido o emaile e senha")
    }
  }

  return (
    <MainPageTemplate display="flex" justifyContent="center">
      <Stack
        display="flex"
        justifyContent="center"
        width="450px"
        height="500px"
        padding="40px"
        boxShadow="0 2px 5px 1px rgba(64, 60, 67, 0.16)"
      >
          <FormControl isInvalid={!!errors.email}>
            <FormLabel>Email</FormLabel>
            <Input
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="exemple@email.com"
            />
            <FormErrorMessage>{errors.email}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.password}>
            <FormLabel>Senha</FormLabel>
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Entre com sua senha"
            />
            <FormErrorMessage>{errors.password}</FormErrorMessage>
          </FormControl>

          <Button
            onClick={(e) => handleSubmit(e)}
            borderRadius="8px"
            marginTop="24px !important"
          >
            Entrar
          </Button>
      </Stack>
    </MainPageTemplate>
  )
}