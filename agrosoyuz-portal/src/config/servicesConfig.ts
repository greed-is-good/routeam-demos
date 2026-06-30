import type { FieldConfig, ServiceCategory, ServiceConfig } from '../types/forms';

export const commonRequestFields: FieldConfig[] = [
  {
    name: 'applicantName',
    label: 'ФИО заявителя',
    type: 'text',
    required: true,
  },
  {
    name: 'farmName',
    label: 'Название хозяйства',
    type: 'text',
  },
  {
    name: 'phone',
    label: 'Телефон',
    type: 'text',
    required: true,
  },
  {
    name: 'location',
    label: 'Населённый пункт / местоположение',
    type: 'text',
    required: true,
    placeholder: 'Например, с. Донское',
  },
  {
    name: 'comment',
    label: 'Комментарий',
    type: 'textarea',
  },
];

export const serviceCategories: ServiceCategory[] = [
  {
    categorySlug: 'goods',
    categoryName: 'Товары и материалы',
    icon: 'PackageCheck',
    tone: 'accent',
    services: [
      {
        categorySlug: 'goods',
        categoryName: 'Товары и материалы',
        serviceSlug: 'fertilizers',
        serviceName: 'Удобрения',
        shortDescription: 'Подбор и поставка удобрений для хозяйства',
        icon: 'Sprout',
        fields: [
          { name: 'crop', label: 'Культура', type: 'text', required: true },
          {
            name: 'fertilizerType',
            label: 'Вид удобрения',
            type: 'select',
            required: true,
            options: ['Минеральные', 'Органические', 'Нужна консультация'],
          },
          { name: 'volume', label: 'Требуемый объём', type: 'text', required: true },
          { name: 'deliveryDate', label: 'Желаемый срок поставки', type: 'date' },
        ],
      },
      {
        categorySlug: 'goods',
        categoryName: 'Товары и материалы',
        serviceSlug: 'crop-protection',
        serviceName: 'Средства защиты растений',
        shortDescription: 'Средства для защиты культур и обработки участка',
        icon: 'Leaf',
        fields: [
          { name: 'crop', label: 'Культура', type: 'text', required: true },
          {
            name: 'task',
            label: 'Задача',
            type: 'select',
            required: true,
            options: ['Сорняки', 'Вредители', 'Болезни растений', 'Нужна консультация'],
          },
          { name: 'area', label: 'Площадь обработки, га', type: 'number', required: true },
          { name: 'desiredDate', label: 'Желаемая дата', type: 'date' },
        ],
      },
      {
        categorySlug: 'goods',
        categoryName: 'Товары и материалы',
        serviceSlug: 'seeds',
        serviceName: 'Посевной материал',
        shortDescription: 'Посевной материал для нового сезона',
        icon: 'Wheat',
        fields: [
          { name: 'crop', label: 'Культура', type: 'text', required: true },
          { name: 'variety', label: 'Сорт / гибрид', type: 'text' },
          { name: 'volume', label: 'Требуемый объём', type: 'text', required: true },
          { name: 'sowingDate', label: 'Планируемая дата посева', type: 'date' },
        ],
      },
    ],
  },
  {
    categorySlug: 'field-work',
    categoryName: 'Полевые работы и техника',
    icon: 'Tractor',
    tone: 'sand',
    services: [
      {
        categorySlug: 'field-work',
        categoryName: 'Полевые работы и техника',
        serviceSlug: 'agricultural-services',
        serviceName: 'Сельскохозяйственные услуги',
        shortDescription: 'Выполнение работ на участке',
        icon: 'ClipboardList',
        fields: [
          {
            name: 'workType',
            label: 'Вид работ',
            type: 'select',
            required: true,
            options: ['Посев', 'Обработка', 'Уборка', 'Другое'],
          },
          { name: 'area', label: 'Площадь участка, га', type: 'number', required: true },
          { name: 'workDate', label: 'Желаемая дата выполнения', type: 'date', required: true },
          { name: 'taskDescription', label: 'Описание задачи', type: 'textarea' },
        ],
      },
      {
        categorySlug: 'field-work',
        categoryName: 'Полевые работы и техника',
        serviceSlug: 'machinery',
        serviceName: 'Предоставление техники',
        shortDescription: 'Техника для выполнения сельскохозяйственных работ',
        icon: 'Tractor',
        fields: [
          {
            name: 'machineryType',
            label: 'Вид техники',
            type: 'select',
            required: true,
            options: ['Трактор', 'Комбайн', 'Опрыскиватель', 'Грузовая техника', 'Другое'],
          },
          { name: 'usagePeriod', label: 'Период использования', type: 'text', required: true },
          { name: 'workScope', label: 'Площадь / объём работ', type: 'text' },
          {
            name: 'operatorRequired',
            label: 'Нужен оператор',
            type: 'radio',
            options: ['Да', 'Нет', 'Нужно уточнить'],
          },
        ],
      },
    ],
  },
  {
    categorySlug: 'storage-sales',
    categoryName: 'Хранение и реализация',
    icon: 'Warehouse',
    tone: 'white',
    services: [
      {
        categorySlug: 'storage-sales',
        categoryName: 'Хранение и реализация',
        serviceSlug: 'storage',
        serviceName: 'Хранение продукции',
        shortDescription: 'Размещение продукции на хранение',
        icon: 'Warehouse',
        fields: [
          { name: 'productType', label: 'Вид продукции', type: 'text', required: true },
          { name: 'productVolume', label: 'Объём продукции', type: 'text', required: true },
          { name: 'storagePeriod', label: 'Период хранения', type: 'text', required: true },
          { name: 'storageConditions', label: 'Особые условия хранения', type: 'textarea' },
        ],
      },
      {
        categorySlug: 'storage-sales',
        categoryName: 'Хранение и реализация',
        serviceSlug: 'sales',
        serviceName: 'Реализация / сбыт продукции',
        shortDescription: 'Помощь в реализации произведённой продукции',
        icon: 'CircleDollarSign',
        fields: [
          { name: 'productType', label: 'Вид продукции', type: 'text', required: true },
          { name: 'productVolume', label: 'Объём продукции', type: 'text', required: true },
          {
            name: 'saleReadiness',
            label: 'Готовность к реализации',
            type: 'select',
            required: true,
            options: ['Продукция уже доступна', 'Ожидается сбор', 'Нужно уточнить'],
          },
          { name: 'saleDate', label: 'Желаемый срок реализации', type: 'date' },
        ],
      },
    ],
  },
  {
    categorySlug: 'land',
    categoryName: 'Земельные услуги',
    icon: 'LandPlot',
    tone: 'sand',
    services: [
      {
        categorySlug: 'land',
        categoryName: 'Земельные услуги',
        serviceSlug: 'land-rent',
        serviceName: 'Аренда земли',
        shortDescription: 'Поиск земли для ведения хозяйства',
        icon: 'LandPlot',
        fields: [
          { name: 'district', label: 'Желаемый район / территория', type: 'text', required: true },
          { name: 'landArea', label: 'Требуемая площадь, га', type: 'number', required: true },
          { name: 'rentTerm', label: 'Срок аренды', type: 'text', required: true },
          { name: 'usagePurpose', label: 'Назначение использования', type: 'text' },
        ],
      },
      {
        categorySlug: 'land',
        categoryName: 'Земельные услуги',
        serviceSlug: 'sublease',
        serviceName: 'Субаренда',
        shortDescription: 'Передача или получение земли в субаренду',
        icon: 'LandPlot',
        fields: [
          {
            name: 'requestType',
            label: 'Тип обращения',
            type: 'select',
            required: true,
            options: ['Ищу землю в субаренду', 'Предлагаю землю в субаренду'],
          },
          { name: 'district', label: 'Район / местоположение', type: 'text', required: true },
          { name: 'landArea', label: 'Площадь, га', type: 'number', required: true },
          { name: 'desiredTerm', label: 'Желаемый срок', type: 'text', required: true },
        ],
      },
    ],
  },
  {
    categorySlug: 'support',
    categoryName: 'Сопровождение хозяйства',
    icon: 'BookOpenCheck',
    tone: 'white',
    services: [
      {
        categorySlug: 'support',
        categoryName: 'Сопровождение хозяйства',
        serviceSlug: 'accounting',
        serviceName: 'Бухгалтерский учёт',
        shortDescription: 'Бухгалтерское сопровождение хозяйства',
        icon: 'FileText',
        fields: [
          {
            name: 'businessForm',
            label: 'Организационная форма',
            type: 'select',
            required: true,
            options: ['ИП', 'КФХ', 'ООО', 'Другое'],
          },
          {
            name: 'serviceRequired',
            label: 'Требуемая услуга',
            type: 'select',
            required: true,
            options: ['Ведение учёта', 'Подготовка отчётности', 'Консультация', 'Другое'],
          },
          {
            name: 'requestFormat',
            label: 'Формат обращения',
            type: 'select',
            required: true,
            options: ['Разово', 'Постоянное сопровождение'],
          },
          { name: 'taskDescription', label: 'Описание задачи', type: 'textarea' },
        ],
      },
      {
        categorySlug: 'support',
        categoryName: 'Сопровождение хозяйства',
        serviceSlug: 'commodity-credit',
        serviceName: 'Товарное кредитование',
        shortDescription: 'Получение товаров или услуг с последующим расчётом',
        icon: 'CreditCard',
        fields: [
          {
            name: 'requiredItem',
            label: 'Что требуется получить',
            type: 'select',
            required: true,
            options: ['Удобрения', 'СЗР', 'Посевной материал', 'Сельхозуслуги', 'Другое'],
          },
          { name: 'requiredVolume', label: 'Требуемый объём / сумма потребности', type: 'text', required: true },
          { name: 'settlementTerm', label: 'Планируемый срок расчёта', type: 'text' },
          { name: 'termsComment', label: 'Комментарий по условиям', type: 'textarea' },
        ],
      },
    ],
  },
];

export const servicesConfig: ServiceConfig[] = serviceCategories.flatMap((category) => category.services);

export const categoryDescriptions: Record<string, string> = {
  goods: 'Материалы для сезонных работ и подготовки посевов.',
  'field-work': 'Работы на участке и техника для выполнения задач хозяйства.',
  'storage-sales': 'Размещение продукции на хранение и помощь с реализацией.',
  land: 'Обращения по аренде и субаренде земельных участков.',
  support: 'Сопровождение хозяйства по учёту и товарному кредитованию.',
};

export function getCategoryBySlug(categorySlug: string | undefined): ServiceCategory | undefined {
  return serviceCategories.find((category) => category.categorySlug === categorySlug);
}

export function getServiceBySlug(serviceSlug: string | undefined): ServiceConfig | undefined {
  return servicesConfig.find((service) => service.serviceSlug === serviceSlug);
}
