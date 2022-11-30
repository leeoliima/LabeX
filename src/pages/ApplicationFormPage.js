import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../hooks/UseForm";
import { goToBack } from "../routes/Coordinator";
import { Buttons, CentralizerDiv, Header, StyledH2 } from "./style";
import { useRequestDataGet } from "../hooks/UseRequestData";
import { BASE_URL } from "../constants/constants";
import axios from "axios";
import { countries } from "../constants/countries";

function ApplicationFormPage() {
  const navigate = useNavigate();
  const [tripId, setTripId] = useState("");

  const [form, onChange, clear] = useForm({
    name: "",
    age: "",
    applicationText: "",
    profession: "",
    country: "",
  });

  const subscribe = (event, body, tripId) => {
    event.preventDefault();

    axios
      .post(`${BASE_URL}trips/${tripId}/apply`, body)
      .then((response) => console.log(response.data));
    alert("Aplicação enviada com sucesso!");
    clear().catch((error) => console.log(error.message));
    alert("Ops! deu erro, tente novamente!");
    clear();
  };
  console.log(form);

  const onChangeTrip = (e) => {
    setTripId(e.target.value);
  };

  const [dataTrip] = useRequestDataGet(`${BASE_URL}trips`, {});

  const tripsSelect =
    dataTrip &&
    dataTrip.trips.map((data) => {
      return <option key={data.id}>{data.name}</option>;
    });

  return (
    <div>
      <Header>
        <StyledH2> Inscreva-se para uma viagem </StyledH2>
      </Header>
      <CentralizerDiv>
        <form onSubmit={subscribe}>
          <select id="select" onChange={onChangeTrip}>
            <option disabled>Escolha uma Viagem</option>
            {tripsSelect}
          </select>
          <br />
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            id="name"
            required
            minLength={2}
            type="text"
            placeholder="Digite seu nome"
          />
          <br />
          <input
            name="age"
            value={form.age}
            onChange={onChange}
            id="age"
            required
            min="18"
            type="number"
            placeholder="Digite sua idade"
          />
          <br />
          <input
            name="applicationText"
            value={form.applicationText}
            onChange={onChange}
            id="applicationText"
            required
            minLength={15}
            type="text"
            placeholder="Por que devemos te escolher?"
          />
          <br />
          <input
            name="profession"
            value={form.profession}
            onChange={onChange}
            id="profession"
            required
            type="text"
            minLength={3}
            placeholder="Digite sua profissão"
          />
          <br />
          <select
            placeholder={"País"}
            name={"country"}
            value={form.country}
            onChange={onChange}
            required
          >
            <option value={""} disabled>
              Escolha um País
            </option>
            {countries.map((country) => {
              return (
                <option value={country} key={country}>
                  {country}
                </option>
              );
            })}
          </select>
          <br />
          <Buttons
            type="button"
            onClick={() => {
              goToBack(navigate);
            }}
          >
            Voltar
          </Buttons>
          <Buttons type={"submit"}>Enviar</Buttons>
        </form>
      </CentralizerDiv>
    </div>
  );
}

export default ApplicationFormPage;
