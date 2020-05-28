<i18n>
	{
		"en": {
      "test": {
        "1": "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
        "2": "Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?",
        "3": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."
      }
		},
		"ru": {
      "test": {
        "1": "С другой стороны реализация намеченных плановых заданий позволяет выполнять важные задания по разработке форм развития. Не следует, однако забывать, что консультация с широким активом обеспечивает широкому кругу (специалистов) участие в формировании направлений прогрессивного развития. Задача организации, в особенности же рамки и место обучения кадров требуют определения и уточнения позиций, занимаемых участниками в отношении поставленных задач. С другой стороны рамки и место обучения кадров играет важную роль в формировании существенных финансовых и административных условий.",
        "2": "Идейные соображения высшего порядка, а также реализация намеченных плановых заданий требуют от нас анализа систем массового участия. Значимость этих проблем настолько очевидна, что консультация с широким активом требуют от нас анализа системы обучения кадров, соответствует насущным потребностям.",
        "3": "Идейные соображения высшего порядка, а также новая модель организационной деятельности влечет за собой процесс внедрения и модернизации дальнейших направлений развития. Не следует, однако забывать, что рамки и место обучения кадров требуют от нас анализа дальнейших направлений развития. Товарищи! начало повседневной работы по формированию позиции играет важную роль в формировании позиций, занимаемых участниками в отношении поставленных задач."
      }
		}
	}
</i18n>

<template>
<div>
  <!-- ОБ ИГРЕ -->
  <p></p>
  <p v-html="$t('test.1')" />
  <p v-html="$t('test.2')" />
  <p v-html="$t('test.3')" />
</div>

</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>

.separator {
  display: flex;
  align-items: center;
  text-align: center;

  &::before, &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #E0E0E0;
  }

  &::before {
    margin-right: .25em;
  }

  &::after {
    margin-left: .25em;
  }
}

.v-btn-toggle {
	background: transparent !important;
}

.continue-button {
	background: var(--FirstLaunchPageInfo--continue-button--background) !important;
}

.continue-button:hover {
	background: var(--FirstLaunchPageInfo--continue-button--background) !important;
}

.genres {
	font-size: 12pt;
	margin: 4px 2px 2px 2px;
	background: var(--v-chip--background) !important;
}

a { 
  text-decoration: none;
	font-weight:bold;
}  

a:hover { 
  text-decoration: none;
	font-weight:bold;
} 

p ::v-deep .subscribe-star {
	color: var(--subscribe-star--color) !important;
}

p ::v-deep .discord {
	color: var(--discord--color) !important;
}

p ::v-deep .tfgames {
	color: var(--tfgames--color) !important;
}

p ::v-deep .f95 {
	color: var(--f95--color) !important;
}

p ::v-deep .f95-zone {
	color: var(--f95-zone--color) !important;
}

</style>