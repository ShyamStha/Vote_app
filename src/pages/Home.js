import { React, useState } from 'react';
import _ from 'lodash';
import {
	Button,
	Card,
	Divider,
	Image,
	Placeholder,
	Header,
	Icon,
	Modal,
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const cards = [
	{
		id: 1,
		avatar:
			'https://upload.wikimedia.org/wikipedia/commons/5/5f/Election_logo_Maoist.jpg',
		date: 'Joined in 2057',
		header: 'नेपाल कमयुनिस्ट पार्टी (माओवादी-केन्द्र)',
		description: 'Des Bandhu Sapkota ',
	},
	{
		id: 2,
		avatar:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Nepali_Congress_Election_Symbol.png/100px-Nepali_Congress_Election_Symbol.png',
		date: 'Joined in 1998',
		header: 'नेपाली काँग्रेस',
		description: 'Bijaya Silwal',
	},
	{
		id: 3,
		avatar:
			'https://myrepublica.nagariknetwork.com/uploads/media/CPN-UML-surya.jpg',
		date: 'Joined in 2013',
		header: 'नेपाल कम्युनिष्ट पार्टी (एमाले)',
		description: 'Shiva Shrestha',
	},
	{
		id: 4,
		avatar:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/RPP_Loktantrik_Symbol.png/108px-RPP_Loktantrik_Symbol.png',
		date: 'Joined in 2056',
		header: 'राष्ट्रिय प्रजातन्त्र पार्टी',
		description: 'Pasupati Samsher Rana',
	},
	{
		id: 5,
		avatar:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Nepalese_Election_Symbol_Pen.jpg/96px-Nepalese_Election_Symbol_Pen.jpg',
		date: 'Joined in 2057',
		header: 'नेपाल कम्युनिस्ट पार्टी (एकीकृत समाजवादी)',
		description: 'Dr. Babu Ram Bhatarai',
	},
	{
		id: 6,
		avatar:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Nepalese_election_symbol_cycle.jpg/100px-Nepalese_election_symbol_cycle.jpg',
		date: 'Joined in 2078',
		header: 'लोकतान्त्रिक समाजवादी पार्टी',
		description: 'Sita Thapa',
	},
];

const Home = () => {
	const [loading, setLoading] = useState(false);
	const [voteForA, setVoteForA] = useState(0);
	const [voteForB, setVoteForB] = useState(0);
	const [voteForC, setVoteForC] = useState(0);
	const [voteForD, setVoteForD] = useState(0);
	const [voteForE, setVoteForE] = useState(0);
	const [voteForF, setVoteForF] = useState(0);
	const [voted, setVoted] = useState(false);
	const [open, setOpen] = useState(false);
	const [openVoted, setOpenVoted] = useState(false);

	const submitVote = () => {
		axios
			.post('https://627e31ec271f386ceff3366e.mockapi.io/vote', {
				partyA: voteForA,
				partyB: voteForB,
				partyC: voteForC,
				partyD: voteForD,
				partyE: voteForE,
				partyF: voteForF,
			})
			.then(
				response => {
					console.log(response);
				},
				error => {
					console.log(error);
				},
			);
	};

	return (
		<>
			<h1>निर्वाचन आयोग नेपाल</h1>

			<Divider />
			<Card.Group doubling itemsPerRow={8} stackable>
				{_.map(cards, card => (
					<Card key={card.header}>
						{loading ? (
							<Placeholder>
								<Placeholder.Image square />
							</Placeholder>
						) : (
							<Image src={card.avatar} />
						)}

						<Card.Content>
							{loading ? (
								<Placeholder>
									<Placeholder.Header>
										<Placeholder.Line length="very short" />
										<Placeholder.Line length="medium" />
									</Placeholder.Header>
									<Placeholder.Paragraph>
										<Placeholder.Line length="short" />
									</Placeholder.Paragraph>
								</Placeholder>
							) : (
								<>
									<Card.Header>{card.header}</Card.Header>
									<Card.Meta>{card.date}</Card.Meta>
									<Card.Description>{card.description}</Card.Description>
								</>
							)}
						</Card.Content>

						<Card.Content extra>
							<Button
								disabled={voted}
								onClick={() => [
									card.id === 1
										? setVoteForA(voteForA + 1)
										: card.id === 2
										? setVoteForB(voteForB + 1)
										: card.id === 3
										? setVoteForC(voteForC + 1)
										: card.id === 4
										? setVoteForD(voteForD + 1)
										: card.id === 5
										? setVoteForE(voteForE + 1)
										: setVoteForF(voteForF + 1),
									setVoted(true),
									setOpen(true),
								]}
								primary
							>
								Vote
							</Button>
							<Button
								disabled={
									(card.id === 1 && voteForA <= 0 ? true : false) ||
									(card.id === 2 && voteForB <= 0 ? true : false) ||
									(card.id === 3 && voteForC <= 0 ? true : false) ||
									(card.id === 4 && voteForD <= 0 ? true : false) ||
									(card.id === 5 && voteForE <= 0 ? true : false) ||
									(card.id === 6 && voteForF <= 0 ? true : false)
								}
								onClick={() => [
									card.id === 1
										? setVoteForA(voteForA - 1)
										: card.id === 2
										? setVoteForB(voteForB - 1)
										: card.id === 3
										? setVoteForC(voteForC - 1)
										: card.id === 4
										? setVoteForD(voteForD - 1)
										: card.id === 5
										? setVoteForE(voteForE - 1)
										: setVoteForF(voteForF - 1),
									setVoted(false),
								]}
							>
								Unvote
							</Button>
						</Card.Content>
					</Card>
				))}
			</Card.Group>
			<Modal
				basic
				onClose={() => setOpen(false)}
				onOpen={() => setOpen(true)}
				open={open}
				size="small"
				// trigger={<Button>Basic Modal</Button>}
			>
				<Header icon>
					<Icon name="archive" />
					You are about to vote for this party.
				</Header>
				<Modal.Content>
					<h1>Are you sure this party is best one?</h1>
				</Modal.Content>
				<Modal.Actions>
					<Button basic color="red" inverted onClick={() => setOpen(false)}>
						<Icon name="remove" /> No
					</Button>
					<Button
						color="green"
						inverted
						onClick={() => [setOpen(false), submitVote(), setOpenVoted(true)]}
					>
						<Icon name="checkmark" /> Yes
					</Button>
				</Modal.Actions>
			</Modal>
			<Modal
				basic
				onClose={() => setOpenVoted(false)}
				onOpen={() => setOpenVoted(true)}
				open={openVoted}
				size="small"
				// trigger={<Button>Basic Modal</Button>}
			>
				<Header icon>
					<Icon name="archive" />
					You have voted!
				</Header>
				<Modal.Content>
					<h4>Thanks want to see the result now?</h4>
				</Modal.Content>
				<Modal.Actions>
					<Button
						basic
						color="red"
						inverted
						onClick={() => [
							setOpenVoted(false),
							setOpen(false),
							window.location.reload(),
						]}
					>
						<Icon name="remove" /> No
					</Button>
					<Link to="/result">
						<Button
							color="green"
							inverted
							onClick={() => [setOpenVoted(false), setOpen(false)]}
						>
							<Icon name="checkmark" /> Yes
						</Button>
					</Link>
				</Modal.Actions>
			</Modal>
			<img
				src="https://election.gov.np/admin/public//storage/New/ECN%20website%20%20%20(1).png"
				class="ui image"
			/>
		</>
	);
};

export default Home;
