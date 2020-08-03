import React, {Component} from 'react';
import styled from 'styled-components';
import {Link} from "react-router-dom";
import queryString from 'query-string';
import {Helmet} from "react-helmet";
import Card from '../components/Card/Card';


const FeedWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 5%;
`;

const Alert = styled.div`
  text-align: center;
`;

const CardLink = styled(Link)`
  text-decoration: none;
  color: inherit
`;

const PagintationBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  `;

const PagintationLink = styled(Link)`
  padding: 1%;
  background-color: lightBlue;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  `;

const ROOT_API = 'https://api.stackexchange.com/2.2/';

class Feed extends Component {
    constructor(props) {
        super(props);

        const query = queryString.parse(props.location.search);

        this.state = {
            data: [],
            page: (query.page) ? parseInt(query.page) : 1,
            loading: true,
            error: '',
        };
    }

    async fetchAPI(page) {
        try {
            const {page} = this.state;
            const data = await fetch(
                `${ROOT_API}questions?order=desc&sort=activity&tagged=reactjs&site=stackoverflow${(page) ? `&page=${page}` : ''}`,
            );
            const dataJSON = await data.json();

            if (dataJSON) {
                this.setState({
                    data: dataJSON,
                    loading: false,
                });
            }
        } catch (error) {
            this.setState({
                loading: false,
                error: error.message,
            });
        }
    }

    componentDidMount() {

        const {page} = this.state;

        this.fetchAPI(page);

    }

    componentDidUpdate(prevProps) {
        if (prevProps.location.search !== this.props.location.search) {
            const query = queryString.parse(this.props.location.search);

            this.setState({
                page: parseInt(query.page)
            }, () => {
                this.fetchAPI(this.state.page);
            })
        }
    }

    render() {
        const {data, loading, error, page} = this.state;
        const {match} = this.props;

        if (loading || error) {
            return (
                <>
                    <Helmet>
                        <title>Q&A Feed - Questions</title>
                    </Helmet>
                    <Alert>{loading ? 'Loading...' : error}</Alert>
                </>
            );
        }

        return (
            <>
                <Helmet>
                    <title>Q&A Feed - Questions</title>
                </Helmet>
                <FeedWrapper>
                    {data.items.map(item => (
                        <CardLink key={item.question_id} to={`/questions/${item.question_id}`}>
                            <Card data={item}/>
                        </CardLink>
                    ))}

                    <PagintationBar>

                        {page > 1 && <PagintationLink to={`${match.url}?page=${page - 1}`}>Prev</PagintationLink>}

                        {data.has_more && <PagintationLink to={`${match.url}?page=${page + 1}`}>Next</PagintationLink>}
                    </PagintationBar>
                </FeedWrapper>
            </>
        );
    }
}

export default Feed;
