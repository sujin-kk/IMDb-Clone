import React from "react";
import { FlatList, useColorScheme } from "react-native";
import styled from "styled-components/native";
import { Movie, TV } from "../api";
import VMedia from "./VMedia";

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

const ListTitle = styled.Text<{ isDark: boolean }>`
  color: ${(props) => (props.isDark ? "white" : props.theme.textColor)};
  font-size: 18px;
  font-weight: 600;
  margin-left: 20px;
  margin-bottom: 20px;
`;

export const HListSeperator = styled.View`
  width: 20px;
`;

interface HListProps {
    title: string;
    data: Movie[] | TV[];
};

const HList: React.FC<HListProps> = ({ title, data }) => {
    const isDark = useColorScheme() === "dark";
    return (<ListContainer>
        <ListTitle isDark={isDark}>{title}</ListTitle>
        <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={data}
            contentContainerStyle={{ paddingHorizontal: 30 }}
            ItemSeparatorComponent={HListSeperator}
            keyExtractor={(item: Movie | TV) => item.id + ""}
            renderItem={({ item }: { item: Movie | TV }) =>(
                <VMedia
                    posterPath={item.poster_path || ""}
                    originalTitle={item.original_title ?? item.original_name}
                    voteAverage={item.vote_average}
                    fullData={item}
                />
            )}
        />
    </ListContainer>
)};

export default HList;