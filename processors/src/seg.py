import json

import openai

from gpt import GPT, Example


def segment(prompt):

    openai.api_key = "sk-4LZVo4FJ1wRYQ8RRsrN1jwVsNJdmy4orkf0QAZ80"

    gpt = GPT(temperature=0, max_tokens=500)

    gpt.add_example(Example("""A mitochondrion (/ˌmaɪtəˈkɒndrɪən/, plural mitochondria) is a double membrane-bound organelle found in most eukaryotic organisms. Mitochondria generate most of the cell's supply of adenosine triphosphate (ATP), used as a source of chemical energy. A mitochondrion is thus nicknamed the powerhouse of the cell, first coined by Philip Siekevitz in a 1957 article of the same name.

    Some cells in some multicellular organisms lack mitochondria (for example, mature mammalian red blood cells). A number of unicellular organisms, such as microsporidia, parabasalids, and diplomonads, have reduced or transformed their mitochondria into other structures.[4] One eukaryote, Monocercomonoides, is known to have completely lost its mitochondria,[5] and one multicellular organism, Henneguya salminicola, is known to have retained mitochondrion-related organelles in association with a complete loss of their mitochondrial genome.

    Mitochondria are commonly between 0.75 and 3 μm² in area[8] but vary considerably in size and structure. Unless specifically stained, they are not visible. In addition to supplying cellular energy, mitochondria are involved in other tasks, such as signaling, cellular differentiation, and cell death, as well as maintaining control of the cell cycle and cell growth.[9] Mitochondrial biogenesis is in turn temporally coordinated with these cellular processes.[10][11] Mitochondria have been implicated in several human diseases and conditions, such as mitochondrial disorders,[12] cardiac dysfunction,[13] heart failure[14] and autism.[15]
    """, "[\"A mitochondria is a double membrane-bound organelle\", \"A mitochondria is found in most eukaryotic organisms\", \"A mitochondria generates most of the cell's supply of adenosine triphosphate (ATP).\"]"))

    sjExample = Example("""Apple was founded in April 1976 by the late Steve Jobs and Ronald Wayne. Wayne would leave the Apple company only three months after its founding to take a job with Atari, and Jobs would end up buying the company from him.""",
    "[\"Apple was founded in April 1976 by the late Steve Jobs and Ronald Wayne.\", \"Ronald Wayne would leave the Apple company only three months after its founding to take a job with Atari, and Jobs would end up buying the company from him.\"]"
    )
    gpt.add_example(sjExample)


    gpt.add_example(Example("""Adenosine triphosphate (ATP) is an organic compound and hydrotrope that provides energy to drive many processes in living cells, such as muscle contraction, nerve impulse propagation, condensate dissolution, and chemical synthesis. Found in all known forms of life, ATP is often referred to as the "molecular unit of currency" of intracellular energy transfer. [2] When consumed in metabolic processes such as cellular respiration, it converts either to adenosine diphosphate (ADP) or to adenosine monophosphate (AMP). Other processes regenerate ATP so that the human body recycles its own body weight equivalent in ATP each day.[3] It is also a precursor to DNA and RNA, and is used as a coenzyme.""", "[\"ATP is an organic compound and hydrotrope.\", \"ATP provides energy to drive many processes in living cells.\", \"ATP is often referred to as the 'molecular unit of currency' of intracellular energy transfer.\"]")) 

    # gpt.add_example(Example("""George Washington (February 22, 1732[b] – December 14, 1799) was an American political leader, military general, statesman, and Founding Father who served as the first president of the United States from 1789 to 1797. 
    # Previously, he led Patriot forces to victory in the nation's War for Independence. 
    # He presided at the Constitutional Convention of 1787, which established the U.S. Constitution and a federal government.
    # Washington has been called the "Father of His Country" for his manifold leadership in the formative days of the new nation.
    # Washington's first public office was serving as official Surveyor of Culpeper County, Virginia from 1749 to 1750. 
    # Subsequently, he received his initial military training and a command with the Virginia Regiment during the French and Indian War. 
    # He was later elected to the Virginia House of Burgesses and was named a delegate to the Continental Congress, where he was appointed Commanding General of the Continental Army. 
    # He commanded American forces, allied with France, in the defeat and surrender of the British during the Siege of Yorktown. 
    # He resigned his commission after the Treaty of Paris in 1783.
    # """, 
    # "[\"George Washington was born on February 22, 1732.\", \"George Washington died on December 14, 1799\", \"George Washington was an American political leader and military general, statesman.\", \"George Wahington was the Founding Father who served as the first president of the United States from 1789 to 1797.\", \"George Washington led the Patriot forces to victory in the nation's War for Independence.\", \" George Washington presided at the Constitutional Convention of 1787, which established the U.S. Constitution and a federal government.\", \"George Washington has been called the 'Father of His Country' for his manifold leadership in the formative days of the new nation.\", \"George Washington was serving as official Surveyor of Culpeper County, Virginia from 1749 to 1750.\", \"George Washington remained impartial in a fierce rivalry between cabinet members Thomas Jefferson and Alexander Hamilton.\", \"George Washington set enduring precedents for the office of president, including the title 'Mr. President'\"]"))

    out = gpt.get_top_reply(prompt)
    return out
