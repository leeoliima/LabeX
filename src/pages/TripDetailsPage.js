import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useProtectedPage from "../hooks/UseProtectedPage";
import { goToAdminHomePage } from "../routes/Coordinator";
import {
  Buttons,
  Card,
  Header,
  StyledH2,
  StyledH3,
  TripScreenContainer,
} from "./style";
import { useRequestDataGet } from "../hooks/UseRequestData";

function TripDetailsPage() {
  useProtectedPage();
  const navigate = useNavigate();
  const { id } = useParams();
  const [tripDetails, getTripDetails] = useRequestDataGet(`/trip/${id}`);

  const candidates =
    tripDetails &&
    tripDetails.trip &&
    tripDetails.trip.candidates.map((c) => {
      return (
        <Card
          key={c.id}
          candidate={c}
          tripId={id}
          getTripDetails={getTripDetails}
        />
      );
    });

  const approvedCandidates =
    tripDetails &&
    tripDetails.trip &&
    tripDetails.trip.approved.map((c) => {
      return <li key={c.id}>{c.name}</li>;
    });

  return (
    <TripScreenContainer>
      <Header>
        <StyledH2>Detalhes</StyledH2>
      </Header>
      {tripDetails && tripDetails.trip && <h1>{tripDetails.trip.name}</h1>}
      {tripDetails && tripDetails.trip && (
        <TripScreenContainer>
          <p>
            <b>Nome:</b> {tripDetails.trip.name}
          </p>
          <p>
            <b>Descrição:</b> {tripDetails.trip.description}
          </p>
          <p>
            <b>Planeta:</b> {tripDetails.trip.planet}
          </p>
          <p>
            <b>Duração:</b> {tripDetails.trip.durationInDays}
          </p>
          <p>
            <b>Data:</b> {tripDetails.trip.date}
          </p>
        </TripScreenContainer>
      )}
      <StyledH3>Candidatos Pendentes</StyledH3> <br />
      {candidates && candidates.length > 0 ? (
        candidates
      ) : (
        <p>Não há candidatos pendentes</p>
      )}
      <StyledH3>Candidatos Aprovados</StyledH3>
      {approvedCandidates && approvedCandidates.length > 0 ? (
        approvedCandidates
      ) : (
        <p>Não há candidatos aprovados</p>
      )}
      <Buttons onClick={() => goToAdminHomePage(navigate)}>Voltar</Buttons>
    </TripScreenContainer>
  );
}

export default TripDetailsPage;
