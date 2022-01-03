import react, { useState } from "react";
import { View, Text } from "react-native";
import { useQuery } from "react-query";
import styled from "styled-components/native";
import { moviesAPI, tvAPI } from "../api";
import HList from "../components/HList";
import Loader from "../components/Loader";

const Container = styled.ScrollView`
  margin-top: 50px;
`;

const SearchBar = styled.TextInput`
  background-color: white;
  padding: 10px 15px;
  border-radius: 15px;
  width: 90%;
  margin: 10px auto;
  margin-bottom: 40px;
`;

const Search = () => {
  const [query, setQuery] = useState("");

  const { isLoading: moviesLoading, data: moviesData, refetch:searchMovie } = useQuery(
    ["searchMovies", query],
    moviesAPI.search,
    {
      enabled: false, // mount 됐을 때 바로 쿼리 실행 막음
    }
  );

  const { isLoading: tvLoading, data: tvData, refetch:searchTv } = useQuery(
    ["searchTv", query],
    tvAPI.search,
    {
      enabled: false, // mount 됐을 때 바로 쿼리 실행 막음
    }
  );

  const onChangeText = (text:string) => { setQuery(text) };

  const onSubmit = () => {
    if(query === "") {
      return;
    }
    searchMovie();
    searchTv();
  }

  return (
  <Container>
    <SearchBar
      onChangeText={onChangeText} 
      onSubmitEditing={onSubmit}
      placeholder="Search for Movie or TV Show"
      placeholderTextColor="grey"
      returnKeyType="search"
    />
    { moviesLoading || tvLoading ? <Loader /> : null }
    { moviesData ? <HList title="Movie Results" data={moviesData.results} /> : null}
    { tvData ? <HList title="Movie Results" data={tvData.results} /> : null}

  </Container>
  )
}

export default Search;

